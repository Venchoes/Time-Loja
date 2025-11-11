import ProductCard from "./ProductCard";
import type { CarProduct } from "~/types/product";

export default function ProductGrid({ products }: { products?: CarProduct[] }) {
  const list = products ?? [];
  
  if (list.length === 0) {
    return (
      <div className="mt-6 text-center text-gray-600">
        <p>Nenhum produto disponível no momento.</p>
      </div>
    );
  }
  
  return (
    <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-6">
      {list.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  );
}
