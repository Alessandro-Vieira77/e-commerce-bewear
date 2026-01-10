export function formatInCentToBRL(valueInCent: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(valueInCent / 100);
}
