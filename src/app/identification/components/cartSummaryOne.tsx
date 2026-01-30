import Image from "next/image";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { Separator } from "@/src/components/ui/separator";
import { formatInCentToBRL } from "@/src/helpers/money";

interface CartSummaryProps {
  subtotalInCents: number;
  totalInCents: number;
  products: {
    id: string;
    name: string;
    variantName: string;
    quantity: number;
    priceInCents: number;
    imageUrl: string;
  };
}

const CartSummaryOne = ({
  subtotalInCents,
  totalInCents,
  products,
}: CartSummaryProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Resumo</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex justify-between">
          <p className="text-sm">Subtotal</p>
          <p className="text-muted-foreground text-sm font-medium">
            {formatInCentToBRL(subtotalInCents)}
          </p>
        </div>
        <div className="flex justify-between">
          <p className="text-sm">Frete</p>
          <p className="text-muted-foreground text-sm font-medium">GRÁTIS</p>
        </div>
        <div className="flex justify-between">
          <p className="text-sm">Total</p>
          <p className="text-muted-foreground text-sm font-medium">
            {formatInCentToBRL(totalInCents)}
          </p>
        </div>

        <div className="py-3">
          <Separator />
        </div>

        <div className="flex items-center justify-between" key={products.id}>
          <div className="flex items-center gap-4">
            <Image
              src={products.imageUrl}
              alt={products.name}
              width={78}
              height={78}
              className="rounded-lg"
            />
            <div className="flex flex-col gap-1">
              <p className="text-sm font-semibold">{products.name}</p>
              <p className="text-muted-foreground text-xs font-medium">
                {products.variantName}
              </p>
            </div>
          </div>
          <div className="flex flex-col items-end justify-center gap-2">
            <p className="text-sm font-bold">
              {formatInCentToBRL(products.priceInCents)}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CartSummaryOne;
