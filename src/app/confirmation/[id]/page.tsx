import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

import FinishOrderButton from "@/src/app/cart/confirmation/components/finish-order-button";
import { formatAddress } from "@/src/app/cart/helpers/address";
import Footer from "@/src/components/common/footer";
import { Header } from "@/src/components/common/header";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { db } from "@/src/db";
import { productVariantTable } from "@/src/db/schema";
import { auth } from "@/src/lib/auth";

import CartSummaryOne from "../../identification/components/cartSummaryOne";

interface ConfirmationPageProps {
  params: Promise<{ id: string }>;
}

const ConfirmationPage = async ({ params }: ConfirmationPageProps) => {
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
  const cartTotalInCents = product.priceInCents;
  if (!cart.shippingAddress) {
    redirect("/cart/identification");
  }
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <div className="space-y-4 px-5">
        <Card>
          <CardHeader>
            <CardTitle>Identificação</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <Card>
              <CardContent>
                <p className="text-sm">{formatAddress(cart.shippingAddress)}</p>
              </CardContent>
            </Card>
            <FinishOrderButton />
          </CardContent>
        </Card>
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
      <div className="mt-auto">
        <Footer />
      </div>
    </div>
  );
};

export default ConfirmationPage;
