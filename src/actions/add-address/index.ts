"use server";

import { headers } from "next/headers";

import { db } from "@/src/db";
import { shippingAddressTable } from "@/src/db/schema";
import { auth } from "@/src/lib/auth";

import { AddAddressInput, addAddressSchema } from "./schema";

export async function addAddress(input: AddAddressInput) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    throw new Error("Usuário não autenticado");
  }

  const result = addAddressSchema.safeParse(input);

  if (!result.success) {
    throw new Error("Dados inválidos");
  }

  const {
    recipientName,
    street,
    number,
    complement,
    city,
    state,
    neighborhood,
    zipCode,
    country,
    phone,
    email,
    cpfOrCnpj,
  } = result.data;

  const [address] = await db
    .insert(shippingAddressTable)
    .values({
      userId: session.user.id,
      recipientName,
      street,
      number,
      complement,
      city,
      state,
      neighborhood,
      zipCode,
      country,
      phone,
      email,
      cpfOrCnpj,
    })
    .returning();

  return address;
}
