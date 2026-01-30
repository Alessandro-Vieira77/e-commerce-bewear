import Link from "next/link";

import { Button } from "@/src/components/ui/button";

interface BuyProductProps {
  productVariantId: string;
}

export const BuyProduct = ({ productVariantId }: BuyProductProps) => {
  return (
    <Button className="rounded-full" size="lg">
      <Link href={`/identification/${productVariantId}`}>Comprar agora</Link>
    </Button>
  );
};
