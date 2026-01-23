import { z } from "zod";

export const updateCartShippingAddressSchema = z.object({
  shippingAddressId: z.string().min(1, "Endereço inválido"),
});

export type UpdateCartShippingAddressInput = z.infer<
  typeof updateCartShippingAddressSchema
>;
