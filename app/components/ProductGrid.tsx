import ProductCard from "./ProductCard";
import { products as allProducts } from "~/data/products";

export default function ProductGrid({ products }: { products?: typeof allProducts }) {
  const list = products ?? allProducts;
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-6">
      {list.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  );
}
