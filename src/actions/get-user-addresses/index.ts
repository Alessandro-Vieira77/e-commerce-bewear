"use server";

import { desc, eq } from "drizzle-orm";
import { headers } from "next/headers";

import { db } from "@/src/db";
import { shippingAddressTable } from "@/src/db/schema";
import { auth } from "@/src/lib/auth";

export async function getUserAddresses() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    throw new Error("Usuário não autenticado");
  }

  const addresses = await db.query.shippingAddressTable.findMany({
    where: eq(shippingAddressTable.userId, session.user.id),
    orderBy: [desc(shippingAddressTable.createdAt)],
  });

  return addresses;
}
