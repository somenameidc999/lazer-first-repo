import type { RunInput, FunctionRunResult } from "../generated/api";
import { DiscountApplicationStrategy } from "../generated/api";

const EMPTY_DISCOUNT: FunctionRunResult = {
  discountApplicationStrategy: DiscountApplicationStrategy.First,
  discounts: [],
};

export function run(input: RunInput): FunctionRunResult {
  let id = '';
  let discountAmount = input.cart.attribute?.value;
  const firstLine = input.cart.lines.find((line) => line.merchandise.__typename === 'ProductVariant');

  if (firstLine?.merchandise?.__typename === 'CustomProduct') {
    discountAmount = '0'
  }

  if (firstLine?.merchandise?.__typename === 'ProductVariant') {
    id = firstLine?.merchandise.id;

    if (firstLine?.merchandise?.product?.productType?.toLowerCase()?.includes('gift')) {
      discountAmount = '0'
    }
  }
  

  const DISCOUNT: FunctionRunResult = {
    discountApplicationStrategy: DiscountApplicationStrategy.First,
    discounts: [
      {
        value: {
          fixedAmount: {
            amount: discountAmount
          }
        },
        message: 'Lazer Discount',
        targets: [
          {
            productVariant: {
              id,
              quantity: firstLine?.quantity,
            }
          }
        ]
      }
    ],
  };

  const discountNumber = parseInt(discountAmount || "");
  return isNaN(discountNumber) || discountNumber <= 0 ? EMPTY_DISCOUNT : DISCOUNT;
}
