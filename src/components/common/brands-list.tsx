"use client";

import Image from "next/image";

const brands = [
  {
    name: "Nike",
    image: "/icons_nike.svg",
  },
  {
    name: "Adidas",
    image: "/icons_adidas.svg",
  },
  {
    name: "Puma",
    image: "/icons_puma.svg",
  },
  {
    name: "New Balance",
    image: "/icons_newbalance.svg",
  },
];

export function BrandsList() {
  return (
    <div className="w-full space-y-6">
      <h3 className="px-5 font-semibold">Marcas parceiras</h3>

      <div className="flex w-full items-center gap-4 overflow-x-auto px-5 py-1 [&::-webkit-scrollbar]:hidden">
        {brands.map((brand) => (
          <div key={brand.name} className="flex flex-col items-center gap-2">
            <div className="flex h-20 min-w-20 items-center justify-center rounded-2xl bg-white shadow-sm">
              <Image
                src={brand.image}
                alt={brand.name}
                width={32}
                height={32}
              />
            </div>
            <p className="truncate text-sm font-semibold">{brand.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
