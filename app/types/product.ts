export type VeiculoType = 
  | 'carro'
  | 'suv'
  | 'pickup'
  | 'esportivo'
  | 'classico'
  | 'van'
  | 'hatch'
  | 'sedan';

export type CarProduct = {
  id: string;
  brand: string;
  modelName: string;
  type: VeiculoType;
  value: number; // valor em centavos BRL
  status: 'disponivel' | 'vendido';
  year: number;
  description?: string;
};

export function formatBRL(cents: number) {
  return (cents / 100).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
  });
}
