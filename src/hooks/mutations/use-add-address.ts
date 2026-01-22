import { useMutation } from "@tanstack/react-query";

import { addAddress } from "@/src/actions/add-address";
import { AddAddressInput } from "@/src/actions/add-address/schema";

export const getAddAddressMutationKey = () => ["add-address"] as const;

export const useAddAddress = () => {
  return useMutation({
    mutationKey: getAddAddressMutationKey(),
    mutationFn: (input: AddAddressInput) => addAddress(input),
  });
};
