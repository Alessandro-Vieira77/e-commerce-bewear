"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { addProductToCart } from "@/src/actions/add-cart-product";
import { AlertDialogCreateAccount } from "@/src/components/common/alert-create-account";
import { Button } from "@/src/components/ui/button";
import { authClient } from "@/src/lib/auth-client";

interface AddToCartButtonProps {
  productVariantId: string;
  quantity: number;
}

export const AddToCartButton = ({
  productVariantId,
  quantity,
}: AddToCartButtonProps) => {
  const [open, setOpen] = useState(false);
  const { data: session } = authClient.useSession();

  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationKey: ["addProductToCart", productVariantId, quantity],
    mutationFn: () =>
      addProductToCart({
        productVariantId,
        quantity,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
      toast("Produto adicionado à sacola");
    },
    onError: (error) => {
      console.error(error);
    },
  });

  function handleAddToCart() {
    if (!session) {
      setOpen(true);
    }
    mutate();
  }

  return (
    <>
      <Button
        className="rounded-full"
        size="lg"
        variant="outline"
        disabled={isPending}
        onClick={handleAddToCart}
      >
        {isPending && <Loader2 className="animate-spin" />}
        Adicionar à sacola
      </Button>
      <AlertDialogCreateAccount open={open} onOpenChange={setOpen} />
    </>
  );
};
