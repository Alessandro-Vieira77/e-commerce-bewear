"use client";
import Image from "next/image";
import Link from "next/link";

import { productTable, productVariantTable } from "@/src/db/schema";
import { formatInCentToBRL } from "@/src/helpers/money";
import { cn } from "@/src/lib/utils";

interface ProductItemProps {
  product: typeof productTable.$inferSelect & {
    variants: (typeof productVariantTable.$inferSelect)[];
  };
  className?: string;
}

export function ProductItem({ product, className }: ProductItemProps) {
  const firstVariant = product?.variants[0];
  return (
    <Link
      href={`/product-variants/${firstVariant?.slug}`}
      className="flex flex-col gap-4"
    >
      <Image
        src={firstVariant?.imageUrl}
        alt={product?.name}
        width={0}
        height={0}
        sizes="100vw"
        className="h-auto w-full rounded-3xl"
      />
      <div className={cn("flex max-w-[200px] flex-col gap-1", className)}>
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
