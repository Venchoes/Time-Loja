import type { Route } from "./+types/home";
import ProductGrid from "~/components/ProductGrid";
import MainStyle from "~/components/MainStyle";
import { useEffect, useState } from "react";
import { fetchAllProducts } from "~/services/products";
import type { CarProduct } from "~/types/product";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Loja de Carros - Vitrine" },
    { name: "description", content: "Vitrine de carros disponíveis para venda" },
  ];
}

export default function Home() {
  const [products, setProducts] = useState<CarProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAllProducts().then((data) => {
      setProducts(data.slice(0, 4));
      setLoading(false);
    });
  }, []);

  return (
    <MainStyle>
      <section className="max-w-6xl">
        <header>
          <h1 className="text-2xl sm:text-3xl font-semibold text-purple-600">
            Encontre seu próximo carro
          </h1>
          <p className="mt-2 text-sm sm:text-base text-gray-900">
            Ofertas selecionadas, quilometragem real e procedência garantida.
            Compare modelos, veja detalhes e adicione ao carrinho para finalizar quando quiser.
          </p>
        </header>
        {loading ? (
          <div className="mt-6 text-center text-gray-600">Carregando...</div>
        ) : (
          <ProductGrid products={products} />
        )}
      </section>
    </MainStyle>
  );
}
