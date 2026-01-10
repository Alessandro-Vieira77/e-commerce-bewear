"use client";
import Image from "next/image";
import Link from "next/link";

import { productTable, productVariantTable } from "@/src/db/schema";
import { formatInCentToBRL } from "@/src/helpers/money";

interface ProductItemProps {
  product: typeof productTable.$inferSelect & {
    variants: (typeof productVariantTable.$inferSelect)[];
  };
}

export function ProductItem({ product }: ProductItemProps) {
  const firstVariant = product?.variants[0];
  return (
    <Link href="/" className="flex flex-col gap-4">
      <Image
        src={firstVariant?.imageUrl}
        alt={product?.name}
        width={200}
        height={200}
        className="rounded-3xl"
      />
      <div className="flex max-w-[200px] flex-col gap-1">
        <p className="truncate text-sm font-medium">{product?.name}</p>
        <p className="text-muted-foreground truncate text-xs font-medium">
          {product?.description}
        </p>
        <p className="truncate text-sm font-semibold">
          {formatInCentToBRL(firstVariant?.priceInCents)}
        </p>
      </div>
    </Link>
  );
}
