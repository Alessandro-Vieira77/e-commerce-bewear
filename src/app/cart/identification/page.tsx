import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { Header } from "@/src/components/common/header";
import { db } from "@/src/db";
import { auth } from "@/src/lib/auth";

import { Addresses } from "./components/addresses";

export default async function CartIndetificationPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session?.user.id) {
    redirect("/");
  }
  const cart = await db.query.cartTable.findFirst({
    where: (cart, { eq }) => eq(cart.userId, session.user.id),
    with: {
      shippingAddress: true,
      items: true,
    },
  });

  if (!cart || cart?.items.length === 0) {
    redirect("/");
  }

  return (
    <>
      <Header />
      <div className="px-5">
        <Addresses />
      </div>
    </>
  );
}
