import ProductGrid from "~/components/ProductGrid";
import MainStyle from "~/components/MainStyle";

export function meta() {
  return [
    { title: "Vitrine - Loja de Carros" },
    { name: "description", content: "Todos os carros disponíveis" },
  ];
}

export default function Vitrine() {
  return (
    <MainStyle>
      <section className="max-w-6xl">
        <div className="flex items-end justify-between">
          <div>
            <h1 className="text-3xl font-semibold text-purple-600">Catálogo completo</h1>
            <p className="mt-2 text-sm text-gray-900">
              Explore todas as opções disponíveis. Filtros e busca avançada em breve.
            </p>
          </div>
        </div>
        <ProductGrid />
      </section>
    </MainStyle>
  );
}
