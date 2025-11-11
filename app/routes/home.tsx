import type { Route } from "./+types/home";
import ProductGrid from "~/components/ProductGrid";
import MainStyle from "~/components/MainStyle";
import { products } from "~/data/products";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Loja de Carros - Vitrine" },
    { name: "description", content: "Vitrine de carros disponíveis para venda" },
  ];
}

export default function Home() {
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
        <ProductGrid products={products.slice(0, 4)} />
      </section>
    </MainStyle>
  );
}
