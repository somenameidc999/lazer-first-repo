import {
  Text,
  Button,
  useApi,
  BlockStack,
  useSettings,
  useTranslate,
  reactExtension,
  useAppMetafields,
  useAttributeValues,
  useApplyAttributeChange,
} from "@shopify/ui-extensions-react/checkout";
import { useState } from "react";

export default reactExtension("purchase.checkout.block.render", () => (
  <Extension />
));

function Extension() {
  const attributeKey = "discountAmount";

  const translate = useTranslate();
  const { collection_to_hide } = useSettings();
  const { cost, analytics, buyerIdentity, lines } = useApi();
  const applyAttributeChange = useApplyAttributeChange();

  const [loading, setLoading] = useState(false);

  const id = buyerIdentity?.customer?.current?.id;
  const metafields = useAppMetafields({
    type: "customer",
    namespace: "custom",
    key: "discount",
  });
  const cartTotal = cost.totalAmount.current.amount;

  const handleOnPress = async (amount: number | string | true) => {
    if (!amount) return;

    setLoading(true);
    analytics.publish("apply_discount", {});

    applyAttributeChange({
      key: attributeKey,
      type: "updateAttribute",
      value: amount.toString(),
    });

    setLoading(false);
  };

  const metafield = metafields?.find(
    (metafield) => metafield.target.type === "customer",
  );
  let discountAmount = metafield?.metafield?.value || 0;

  // If cart line product type equals collection then disable discount amount
  lines.current.forEach((line) => {
    if (
      line?.merchandise?.product?.productType?.toLowerCase() ===
      collection_to_hide?.toString()?.toLowerCase()
    ) {
      discountAmount = 0;
    }
  });

  return (
    <BlockStack border="base" borderWidth="medium" padding="extraLoose">
      <Text size="medium">Cart Total: {cartTotal}</Text>
      <Text size="medium">Discount Amount: {discountAmount}</Text>
      <Text size="medium">Collection to hide: {collection_to_hide}</Text>
      <Button
        loading={loading}
        disabled={!discountAmount}
        onPress={() => handleOnPress(discountAmount)}
      >
        Apply Discount
      </Button>
    </BlockStack>
  );
}
