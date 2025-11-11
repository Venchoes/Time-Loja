import { Link } from "react-router";
import type { CarProduct } from "~/types/product";
import { formatBRL } from "~/types/product";
import { useCartStore } from "~/store/cart";

export default function ProductCard({ product }: { product: CarProduct }) {
  const add = useCartStore((s) => s.add);
  return (
    <div className="rounded-lg border border-gray-200 overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow">
      <div className="aspect-[4/3] overflow-hidden">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
          loading="lazy"
        />
      </div>
      <div className="p-3 sm:p-4">
        <div className="flex items-center justify-between gap-2">
          <h3 className="font-semibold text-purple-600 line-clamp-1 text-sm sm:text-base">
            {product.name}
          </h3>
          <span className="text-xs sm:text-sm text-gray-900 whitespace-nowrap">{product.year}</span>
        </div>
        <p className="mt-1 text-xs sm:text-sm text-gray-900 line-clamp-1">
          {product.brand} • {product.km.toLocaleString("pt-BR")} km • {product.fuel}
        </p>
        <p className="mt-2 text-base sm:text-lg font-semibold text-purple-600">
          {formatBRL(product.price)}
        </p>
        <div className="mt-3 flex flex-col sm:flex-row gap-2">
          <Link
            to={`/produto/${product.id}`}
            className="flex-1 rounded-md border border-gray-300 bg-purple-600 px-3 py-2 text-center text-xs sm:text-sm text-white hover:bg-purple-700 transition-colors"
          >
            Ver detalhes
          </Link>
          <button
            onClick={() => add(product, 1)}
            className="flex-1 rounded-md bg-gray-900 px-3 py-2 text-center text-xs sm:text-sm text-white hover:bg-black transition-colors"
          >
            Adicionar
          </button>
        </div>
      </div>
    </div>
  );
}
