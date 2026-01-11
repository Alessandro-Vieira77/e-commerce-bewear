import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";

import { Header } from "@/src/components/common/header";
import { ProductItem } from "@/src/components/common/product-item";
import { db } from "@/src/db";
import { categoryTable, productTable } from "@/src/db/schema";

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;

  const category = await db.query.categoryTable.findFirst({
    where: eq(categoryTable.slug, slug),
  });

  if (!category) {
    return notFound();
  }

  const products = await db.query.productTable.findMany({
    where: eq(productTable.categoryId, category.id),
    with: {
      variants: true,
    },
  });

  return (
    <>
      <Header />
      <div className="space-y-6 px-5">
        <h2 className="text-2xl font-semibold">{category.name}</h2>
        <div className="mt-6 grid grid-cols-2 gap-4">
          {products.map((product) => (
            <ProductItem
              key={product.id}
              product={product}
              className="w-full"
            />
          ))}
        </div>
      </div>
    </>
  );
}
