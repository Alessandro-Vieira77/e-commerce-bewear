import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

import Footer from "@/src/components/common/footer";
import { Header } from "@/src/components/common/header";
import { db } from "@/src/db";
import { productVariantTable, shippingAddressTable } from "@/src/db/schema";
import { auth } from "@/src/lib/auth";

import { Addresses } from "../../../app/cart/identification/components/addresses";
import CartSummaryOne from "../components/cartSummaryOne";

interface IdentificationPageProps {
  params: Promise<{ id: string }>;
}

const IdentificationPage = async ({ params }: IdentificationPageProps) => {
  const { id } = await params;
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session?.user.id) {
    redirect("/");
  }

  const product = await db.query.productVariantTable.findFirst({
    where: eq(productVariantTable.id, id),
  });

  if (!product) {
    redirect("/");
  }

  const cart = await db.query.cartTable.findFirst({
    where: (cart, { eq }) => eq(cart.userId, session.user.id),
    with: {
      shippingAddress: true,
      items: {
        with: {
          productVariant: {
            with: {
              product: true,
            },
          },
        },
      },
    },
  });
  if (!cart || cart?.items.length === 0) {
    redirect("/");
  }
  const shippingAddresses = await db.query.shippingAddressTable.findMany({
    where: eq(shippingAddressTable.userId, session.user.id),
  });
  const cartTotalInCents = product.priceInCents;
  return (
    <div>
      <Header />
      <div className="space-y-4 px-5">
        <Addresses
          shippingAddresses={shippingAddresses}
          defaultShippingAddressId={cart.shippingAddress?.id || null}
        />
        <CartSummaryOne
          subtotalInCents={cartTotalInCents}
          totalInCents={cartTotalInCents}
          products={{
            id: product.id,
            name: product.name,
            variantName: product.name,
            quantity: 1,
            priceInCents: product.priceInCents,
            imageUrl: product.imageUrl,
          }}
        />
      </div>
      <div className="mt-12">
        <Footer />
      </div>
    </div>
  );
};

export default IdentificationPage;
