import type {
  RunInput,
  FunctionRunResult,
  FunctionError,
} from "../generated/api";

export function run(input: RunInput): FunctionRunResult {
  const cartTotal = input.cart.cost.totalAmount.amount;

  return {
    errors:
      cartTotal < 100
        ? [
            {
              localizedMessage: "Cannot have discount carts less than 100",
              target: "cart",
            },
          ]
        : [],
  };
};