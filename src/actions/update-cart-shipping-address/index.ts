"use server";

import { eq } from "drizzle-orm";
import { headers } from "next/headers";

import { db } from "@/src/db";
import { cartTable } from "@/src/db/schema";
import { auth } from "@/src/lib/auth";

import {
  UpdateCartShippingAddressInput,
  updateCartShippingAddressSchema,
} from "./schema";

export async function updateCartShippingAddress(
  input: UpdateCartShippingAddressInput,
) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    throw new Error("Unauthorized");
  }

  const result = updateCartShippingAddressSchema.safeParse(input);

  if (!result.success) {
    throw new Error("Invalid input");
  }

  const { shippingAddressId } = result.data;

  // We find the cart by userId, similar to getCart
  const existingCart = await db.query.cartTable.findFirst({
    where: (cart, { eq }) => eq(cart.userId, session.user.id),
  });

  if (!existingCart) {
    throw new Error("Carrinho não encontrado");
  }

  await db
    .update(cartTable)
    .set({
      shippingAddressId,
    })
    .where(eq(cartTable.id, existingCart.id));
}
