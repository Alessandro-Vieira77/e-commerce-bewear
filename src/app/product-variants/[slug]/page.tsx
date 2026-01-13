"server";
import { eq } from "drizzle-orm";
import Image from "next/image";
import { notFound } from "next/navigation";

import Footer from "@/src/components/common/footer";
import { Header } from "@/src/components/common/header";
import { ProductList } from "@/src/components/common/product-list";
import { db } from "@/src/db";
import { productTable, productVariantTable } from "@/src/db/schema";
import { formatInCentToBRL } from "@/src/helpers/money";

import { ProductActions } from "../_components/product-actions";
import { VariantSelector } from "../_components/variant-selector";

interface ProductVariantsPageProps {
  params: Promise<{ slug: string }>;
}

export default async function ProductVariantsPage({
  params,
}: ProductVariantsPageProps) {
  const { slug } = await params;

  const productVariant = await db.query.productVariantTable.findFirst({
    where: eq(productVariantTable.slug, slug),
    with: {
      product: {
        with: {
          variants: true,
        },
      },
    },
  });

  if (!productVariant) {
    return notFound();
  }

  const likelyProducts = await db.query.productTable.findMany({
    where: eq(productTable.categoryId, productVariant.product.categoryId),
    with: {
      variants: true,
    },
  });

  return (
    <>
      <Header />
      <div className="flex flex-col space-y-6">
        <Image
          src={productVariant.imageUrl}
          alt={productVariant.name}
          width={0}
          height={0}
          sizes="100vw"
          className="h-auto w-full object-cover"
        />

        <div className="px-5">
          <VariantSelector
            variant={productVariant.product.variants}
            selectorVariantSlug={productVariant.slug}
          />
        </div>

        <div className="space-y-4 px-5">
          {/* description */}
          <div className="flex flex-col">
            <h2 className="text-lg font-semibold">
              {productVariant.product.name}
            </h2>

            <h3 className="text-muted-foreground text-sm">
              {productVariant.name}
            </h3>

            <h3 className="text-lg font-semibold">
              {formatInCentToBRL(productVariant.priceInCents)}
            </h3>
          </div>

          <ProductActions productVariantId={productVariant.id} />

          <div className="px-5">
            <p className="text-sm text-shadow-amber-600">
              {productVariant.product.description}
            </p>
          </div>
        </div>
        <ProductList products={likelyProducts} title="Talvez você goste" />

        <Footer />
      </div>
    </>
  );
}
