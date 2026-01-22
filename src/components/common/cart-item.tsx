import { MinusIcon, PlusIcon, TrashIcon } from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";

import { Button } from "@/src/components/ui/button";
import { formatInCentToBRL } from "@/src/helpers/money";
import { useDecreaseCartProduct } from "@/src/hooks/mutations/use-decrease-cart-product";
import { useIncreaseCartProduct } from "@/src/hooks/mutations/use-increase-cart-product";
import { useRemoveProductFromCart } from "@/src/hooks/mutations/use-remove-product-from-cart";

interface CartItemProps {
  id: string;
  productName: string;
  productVariantName: string;
  productVariantImageUrl: string;
  productVariantPriceInCents: number;
  productVariantId: string;
  quantity: number;
}

const CartItem = ({
  id,
  productVariantId,
  productName,
  productVariantName,
  productVariantImageUrl,
  productVariantPriceInCents,
  quantity,
}: CartItemProps) => {
  const RemoveProductFromCart = useRemoveProductFromCart(id);

  const DecreaseCartProductQuantity = useDecreaseCartProduct(id);

  const IncreaseCartProductQuantity = useIncreaseCartProduct(productVariantId);

  const handleDeleteClick = () => {
    RemoveProductFromCart.mutate(undefined, {
      onSuccess: () => {
        toast.success("Produto removido do carrinho");
      },
      onError: (error) => {
        console.error(error);
        toast.error("Erro ao remover produto do carrinho");
      },
    });
  };

  const handleDecreaseQuantityClick = () => {
    DecreaseCartProductQuantity.mutate(undefined, {
      onError: (error) => {
        console.error(error);
        toast.error("Erro ao diminuir quantidade do produto");
      },
    });
  };

  const handleIncreaseQuantityClick = () => {
    IncreaseCartProductQuantity.mutate(undefined, {
      onError: (error) => {
        console.error(error);
        toast.error("Erro ao aumentar quantidade do produto");
      },
    });
  };

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <Image
          src={productVariantImageUrl}
          alt={productVariantName}
          width={60}
          height={60}
          className="rounded-lg"
        />
        <div className="flex flex-col gap-1">
          <p className="w-25 truncate text-sm font-semibold">{productName}</p>
          <p className="text-muted-foreground text-xs font-medium">
            {productVariantName}
          </p>
          <div className="flex w-[85px] items-center justify-between rounded-lg border p-1">
            <Button
              className="h-4 w-4"
              variant="ghost"
              onClick={handleDecreaseQuantityClick}
            >
              <MinusIcon />
            </Button>
            <p className="text-xs font-medium">{quantity}</p>
            <Button
              className="h-4 w-4"
              variant="ghost"
              onClick={handleIncreaseQuantityClick}
            >
              <PlusIcon />
            </Button>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-end justify-center gap-2">
        <Button variant="outline" size="icon" onClick={handleDeleteClick}>
          <TrashIcon />
        </Button>
        <p className="text-xs font-bold">
          {formatInCentToBRL(productVariantPriceInCents)}
        </p>
      </div>
    </div>
  );
};

export default CartItem;
