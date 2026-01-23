"use client";

import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/src/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { Label } from "@/src/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/src/components/ui/radio-group";
import { ScrollArea } from "@/src/components/ui/scroll-area";
import { shippingAddressTable } from "@/src/db/schema";
import { useUpdateCartShippingAddress } from "@/src/hooks/mutations/use-update-cart-shipping-address";
import { useUserAddresses } from "@/src/hooks/queries/use-user-addresses";

import { AddressForm } from "./address-form";

interface AddressesProps {
  shippingAddresses: (typeof shippingAddressTable.$inferSelect)[];
  defaultShippingAddressId?: string | null;
}

export const Addresses = ({
  shippingAddresses,
  defaultShippingAddressId,
}: AddressesProps) => {
  const [selectedAddress, setSelectedAddress] = useState<string | null>(
    defaultShippingAddressId || null,
  );
  const { data: addresses } = useUserAddresses({
    initialData: shippingAddresses,
  });

  const { mutate: updateCartShippingAddress, isPending } =
    useUpdateCartShippingAddress();

  const handleLinkAddress = (addressId: string) => {
    updateCartShippingAddress(
      { shippingAddressId: addressId },
      {
        onSuccess: () => {
          toast.success("Endereço vinculado ao carrinho!");
          setSelectedAddress(addressId);
        },
        onError: () => {
          toast.error("Erro ao vincular endereço.");
        },
      },
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Identificação</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <RadioGroup
          value={selectedAddress}
          onValueChange={setSelectedAddress}
          className="w-full"
        >
          <ScrollArea className="h-full max-h-[300px] w-full">
            <div className="flex flex-col gap-3">
              {addresses?.map((address) => (
                <Card
                  key={address.id}
                  className={`cursor-pointer border-2 shadow-none ${
                    selectedAddress === address.id
                      ? "border-primary"
                      : "border-border"
                  }`}
                  onClick={() => setSelectedAddress(address.id)}
                >
                  <CardContent className="flex items-center gap-4 p-4">
                    <RadioGroupItem
                      value={address.id}
                      id={address.id}
                      className="data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground border-primary"
                    />
                    <Label
                      htmlFor={address.id}
                      className="cursor-pointer leading-relaxed"
                    >
                      <span className="block text-sm font-semibold text-black">
                        {address.recipientName}, {address.street},{" "}
                        {address.number}
                        {address.complement ? `, ${address.complement}` : ""}
                        <br />
                        {address.neighborhood}, {address.city} - {address.state}
                      </span>
                    </Label>
                  </CardContent>
                </Card>
              ))}

              <Card
                className={`cursor-pointer border-2 shadow-none ${
                  selectedAddress === "add-new"
                    ? "border-primary"
                    : "border-border"
                }`}
                onClick={() => setSelectedAddress("add-new")}
              >
                <CardContent className="flex items-center gap-4 p-4">
                  <RadioGroupItem
                    value="add-new"
                    id="add-new"
                    className="data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground border-primary"
                  />
                  <Label
                    htmlFor="add-new"
                    className="cursor-pointer font-medium"
                  >
                    Adicionar novo
                  </Label>
                </CardContent>
              </Card>
            </div>
          </ScrollArea>
        </RadioGroup>

        {selectedAddress === "add-new" && (
          <AddressForm onSuccess={handleLinkAddress} />
        )}

        {selectedAddress && selectedAddress !== "add-new" && (
          <div className="pt-4">
            <Button
              className="w-full"
              onClick={() => handleLinkAddress(selectedAddress)}
              disabled={isPending}
            >
              {isPending ? "Salvando..." : "Ir para pagamento"}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
