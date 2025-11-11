import { useParams } from "react-router";
import { getProductById } from "~/data/products";
import { formatBRL } from "~/types/product";
import { useCartStore } from "~/store/cart";
import MainStyle from "~/components/MainStyle";
import StatBar from "~/components/StatBar";

export function meta() {
  return [
    { title: "Detalhe do Produto - Loja de Carros" },
    { name: "description", content: "Detalhes do veículo selecionado" },
  ];
}

export default function Produto() {
  const params = useParams();
  const add = useCartStore((s) => s.add);

  const product = params.id ? getProductById(params.id) : undefined;
  if (!product) {
    return (
      <main className="container mx-auto px-4 py-8">
        <p className="text-gray-600">Carro não encontrado.</p>
      </main>
    );
  }

  return (
    <MainStyle>
      <div className="grid gap-10 lg:grid-cols-2">
        <div className="aspect-[4/3] overflow-hidden rounded-xl border shadow-sm">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="h-full w-full object-cover"
          />
        </div>
        <div>
          <h1 className="text-3xl font-semibold text-purple-600 leading-tight">
            {product.name}
          </h1>
          <p className="mt-3 text-sm text-gray-900">
            {product.brand} • Ano {product.year} • {product.km.toLocaleString("pt-BR")} km
          </p>
          <p className="mt-1 text-sm text-gray-900">
            {product.fuel} • {product.transmission} • Cor {product.color}
          </p>
          <p className="mt-6 text-4xl font-bold text-purple-600">
            {formatBRL(product.price)}
          </p>
          {product.description && (
            <p className="mt-6 text-gray-900 leading-relaxed max-w-prose">
              {product.description}
            </p>
          )}
          {product.stats && (
            <div className="mt-8">
              <h2 className="text-lg font-semibold text-purple-600 mb-4">
                Estatísticas de Desempenho
              </h2>
              <div className="space-y-4">
                <StatBar label="Velocidade" value={product.stats.speed} />
                <StatBar label="Aceleração" value={product.stats.acceleration} />
                <StatBar label="Frenagem" value={product.stats.braking} />
                <StatBar label="Drift" value={product.stats.drift} />
              </div>
            </div>
          )}
          <div className="mt-8 flex gap-4">
            <button
              onClick={() => add(product, 1)}
              className="rounded-lg bg-gray-900 px-6 py-3 text-sm font-medium text-white shadow hover:bg-black"
            >
              Adicionar ao carrinho
            </button>
          </div>
        </div>
      </div>
    </MainStyle>
  );
}
