import { Link } from "react-router";
import type { CarProduct } from "~/types/product";
import { formatBRL } from "~/types/product";
import { useCartStore } from "~/store/cart";

export default function ProductCard({ product }: { product: CarProduct }) {
  const add = useCartStore((s) => s.add);
  
  const displayName = `${product.brand} ${product.modelName}`;
  const isAvailable = product.status === 'disponivel';
  
  return (
    <div className="rounded-lg border border-gray-200 overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow">
      <div className="aspect-[4/3] overflow-hidden bg-gray-200 flex items-center justify-center">
        <div className="text-gray-400 text-sm">
          {displayName}
        </div>
      </div>
      <div className="p-3 sm:p-4">
        <div className="flex items-center justify-between gap-2">
          <h3 className="font-semibold text-purple-600 line-clamp-1 text-sm sm:text-base">
            {displayName}
          </h3>
          <span className="text-xs sm:text-sm text-gray-900 whitespace-nowrap">{product.year}</span>
        </div>
        <p className="mt-1 text-xs sm:text-sm text-gray-900 line-clamp-1">
          Tipo: {product.type} • {isAvailable ? 'Disponível' : 'Vendido'}
        </p>
        <p className="mt-2 text-base sm:text-lg font-semibold text-purple-600">
          {formatBRL(product.value)}
        </p>
        {product.description && (
          <p className="mt-2 text-xs text-gray-600 line-clamp-2">
            {product.description}
          </p>
        )}
        <div className="mt-3 flex flex-col sm:flex-row gap-2">
          <Link
            to={`/produto/${product.id}`}
            className="flex-1 rounded-md border border-gray-300 bg-purple-600 px-3 py-2 text-center text-xs sm:text-sm text-white hover:bg-purple-700 transition-colors"
          >
            Ver detalhes
          </Link>
          <button
            onClick={() => add(product, 1)}
            disabled={!isAvailable}
            className={`flex-1 rounded-md px-3 py-2 text-center text-xs sm:text-sm text-white transition-colors ${
              isAvailable 
                ? 'bg-gray-900 hover:bg-black' 
                : 'bg-gray-400 cursor-not-allowed'
            }`}
          >
            {isAvailable ? 'Adicionar' : 'Indisponível'}
          </button>
        </div>
      </div>
    </div>
  );
}
