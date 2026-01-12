"server";

import { eq } from "drizzle-orm";
import { headers } from "next/headers";

import { db } from "../db";
import { cartItemTable, cartTable } from "../db/schema";
import { auth } from "../lib/auth";
import { AddCartProductSchema, addCartProductSchema } from "./schema";

export const addCartProduct = async (data: AddCartProductSchema) => {
  addCartProductSchema.parse(data);

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    throw new Error("Unauthorized");
  }

  const productVariant = await db.query.productVariantTable.findFirst({
    where: (productVariant, { eq }) => eq(productVariant.id, data.variantId),
  });

  if (!productVariant) {
    throw new Error("Product variant not found");
  }

  const cart = await db.query.cartTable.findFirst({
    where: eq(cartTable.userId, session.user.id),
  });

  let cartId = cart?.id;
  if (!cartId) {
    const [cart] = await db
      .insert(cartTable)
      .values({
        userId: session.user.id,
      })
      .returning();
    cartId = cart?.id;
  }

  const cartItem = await db.query.cartItemTable.findFirst({
    where: (cartItem, { eq }) =>
      eq(cartItem.cartId, cartId) &&
      eq(cartItem.productVariantId, data.variantId),
  });

  if (cartItem) {
    await db
      .update(cartItemTable)
      .set({
        quantity: cartItem.quantity + Number(data.quantity),
      })
      .where(eq(cartItemTable.id, cartItem.id));
  }

  await db.insert(cartItemTable).values({
    cartId,
    productVariantId: data.variantId,
    quantity: Number(data.quantity),
  });
};
