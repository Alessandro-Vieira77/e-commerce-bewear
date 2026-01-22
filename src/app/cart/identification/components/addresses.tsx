"use client";

import { useState } from "react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { Label } from "@/src/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/src/components/ui/radio-group";

import { AddressForm } from "./address-form";

export const Addresses = () => {
  const [selectedAddress, setSelectedAddress] = useState<string | null>(null);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Identificação</CardTitle>
      </CardHeader>
      <CardContent>
        <Card>
          <CardContent>
            <RadioGroup
              value={selectedAddress}
              onValueChange={setSelectedAddress}
              className="w-fit"
            >
              <div className="flex items-center gap-3">
                <RadioGroupItem value="add-new" id="add-new" />
                <Label htmlFor="add-new">Adicionar novo endereço</Label>
              </div>
            </RadioGroup>
          </CardContent>
        </Card>
        {selectedAddress === "add-new" && <AddressForm />}
      </CardContent>
    </Card>
  );
};
