import { useMutation, useQueryClient } from "@tanstack/react-query";

import { updateCartShippingAddress } from "@/src/actions/update-cart-shipping-address";
import { UpdateCartShippingAddressInput } from "@/src/actions/update-cart-shipping-address/schema";

import { getUseCartQueryKey } from "../queries/use-cart";

export const getUpdateCartShippingAddressMutationKey = () =>
  ["update-cart-shipping-address"] as const;

export const useUpdateCartShippingAddress = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: getUpdateCartShippingAddressMutationKey(),
    mutationFn: (input: UpdateCartShippingAddressInput) =>
      updateCartShippingAddress(input),
    onSuccess: () => {
      // Invalidate cart to reflect new shipping address
      queryClient.invalidateQueries({ queryKey: getUseCartQueryKey() });
    },
  });
};
