import Image from "next/image";
import Link from "next/link";

import { productVariantTable } from "@/src/db/schema";

interface VariantSelectorProps {
  selectorVariantSlug: string;
  variant: (typeof productVariantTable.$inferSelect)[];
}

export function VariantSelector({
  variant,
  selectorVariantSlug,
}: VariantSelectorProps) {
  return (
    <div className="flex items-center gap-4">
      {variant.map((variant) => (
        <Link
          href={`/product-variants/${variant.slug}`}
          key={variant.id}
          className={
            selectorVariantSlug === variant.slug
              ? "border-primary rounded-lg border-2"
              : ""
          }
        >
          <Image
            src={variant.imageUrl}
            alt={variant.name}
            width={68}
            height={68}
            className="rounded-lg"
          />
        </Link>
      ))}
    </div>
  );
}
