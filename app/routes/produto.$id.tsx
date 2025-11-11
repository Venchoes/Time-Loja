import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { fetchProductById } from "~/services/products";
import type { CarProduct } from "~/types/product";
import { formatBRL } from "~/types/product";
import { useCartStore } from "~/store/cart";
import MainStyle from "~/components/MainStyle";

export function meta() {
  return [
    { title: "Detalhe do Produto - Loja de Carros" },
    { name: "description", content: "Detalhes do veículo selecionado" },
  ];
}

export default function Produto() {
  const params = useParams();
  const add = useCartStore((s) => s.add);
  const [product, setProduct] = useState<CarProduct | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (params.id) {
      fetchProductById(params.id).then((data) => {
        setProduct(data);
        setLoading(false);
      });
    }
  }, [params.id]);

  if (loading) {
    return (
      <MainStyle>
        <div className="text-center text-gray-600">Carregando...</div>
      </MainStyle>
    );
  }

  if (!product) {
    return (
      <MainStyle>
        <div className="text-center">
          <p className="text-gray-600">Carro não encontrado.</p>
        </div>
      </MainStyle>
    );
  }

  const displayName = `${product.brand} ${product.modelName}`;
  const isAvailable = product.status === 'disponivel';

  return (
    <MainStyle>
      <div className="grid gap-6 lg:gap-10 lg:grid-cols-2">
        <div className="aspect-[4/3] overflow-hidden rounded-xl border shadow-sm bg-gray-200 flex items-center justify-center">
          <div className="text-gray-400 text-lg">
            {displayName}
          </div>
        </div>
        <div className="space-y-4">
          <h1 className="text-2xl sm:text-3xl font-semibold text-purple-600 leading-tight">
            {displayName}
          </h1>
          <p className="text-sm text-gray-900">
            {product.brand} • Ano {product.year} • {product.type}
          </p>
          <p className="text-sm text-gray-900">
            Status: <span className={isAvailable ? 'text-green-600 font-semibold' : 'text-red-600 font-semibold'}>
              {isAvailable ? 'Disponível' : 'Vendido'}
            </span>
          </p>
          <p className="text-3xl sm:text-4xl font-bold text-purple-600">
            {formatBRL(product.value)}
          </p>
          {product.description && (
            <p className="text-gray-900 leading-relaxed max-w-prose">
              {product.description}
            </p>
          )}
          <div className="pt-4 flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => add(product, 1)}
              disabled={!isAvailable}
              className={`w-full sm:w-auto rounded-lg px-6 py-3 text-sm font-medium text-white shadow transition-colors ${
                isAvailable
                  ? 'bg-gray-900 hover:bg-black'
                  : 'bg-gray-400 cursor-not-allowed'
              }`}
            >
              {isAvailable ? 'Adicionar ao carrinho' : 'Indisponível'}
            </button>
          </div>
        </div>
      </div>
    </MainStyle>
  );
}
