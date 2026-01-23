import { useMutation, useQueryClient } from "@tanstack/react-query";

import { addAddress } from "@/src/actions/add-address";
import { AddAddressInput } from "@/src/actions/add-address/schema";

import { getUserAddressesQueryKey } from "../queries/use-user-addresses";

export const getAddAddressMutationKey = () => ["add-address"] as const;

export const useAddAddress = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: getAddAddressMutationKey(),
    mutationFn: (input: AddAddressInput) => addAddress(input),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: getUserAddressesQueryKey(),
      });
    },
  });
};
