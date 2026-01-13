import { z } from "zod";

export const addCartProductSchema = z.object({
  variantId: z.uuid(),
  quantity: z.string().min(1),
});

export type AddCartProductSchema = z.infer<typeof addCartProductSchema>;
