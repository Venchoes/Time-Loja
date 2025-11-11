export type CarProduct = {
  id: string;
  name: string;
  brand: string;
  year: number;
  price: number; // in BRL cents
  imageUrl: string;
  km: number;
  fuel: "Gasolina" | "Etanol" | "Flex" | "Diesel" | "Elétrico" | "Híbrido";
  transmission: "Manual" | "Automática";
  color: string;
  description?: string;
  stats?: {
    speed: number; // 0-100
    acceleration: number; // 0-100
    braking: number; // 0-100
    drift: number; // 0-100
  };
};

export function formatBRL(cents: number) {
  return (cents / 100).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
  });
}
