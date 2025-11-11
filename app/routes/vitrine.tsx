import ProductGrid from "~/components/ProductGrid";
import MainStyle from "~/components/MainStyle";
import { useEffect, useState } from "react";
import { fetchAllProducts } from "~/services/products";
import type { CarProduct } from "~/types/product";

export function meta() {
  return [
    { title: "Vitrine - Loja de Carros" },
    { name: "description", content: "Todos os carros disponíveis" },
  ];
}

export default function Vitrine() {
  const [products, setProducts] = useState<CarProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAllProducts().then((data) => {
      setProducts(data);
      setLoading(false);
    });
  }, []);

  return (
    <MainStyle>
      <section className="max-w-6xl">
        <div className="flex items-end justify-between">
          <div>
            <h1 className="text-2xl sm:text-3xl font-semibold text-purple-600">Catálogo completo</h1>
            <p className="mt-2 text-sm sm:text-base text-gray-900">
              Explore todas as opções disponíveis. Filtros e busca avançada em breve.
            </p>
          </div>
        </div>
        {loading ? (
          <div className="mt-6 text-center text-gray-600">Carregando...</div>
        ) : (
          <ProductGrid products={products} />
        )}
      </section>
    </MainStyle>
  );
}
