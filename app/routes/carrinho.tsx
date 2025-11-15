import { useCartStore, getProductKey } from "~/store/cart";
import { formatBRL } from "~/types/product";
import MainStyle from "~/components/MainStyle";

export function meta() {
  return [
    { title: "Carrinho - Loja de Carros" },
    { name: "description", content: "Itens selecionados para compra" },
  ];
}

export default function Carrinho() {
  const { items, remove, setQty, clear, totalCents } = useCartStore();
  const total = totalCents();

  return (
    <MainStyle>
      <h1 className="text-2xl sm:text-3xl font-semibold text-purple-600">Seu carrinho</h1>
      {items.length === 0 ? (
        <p className="mt-6 text-gray-900">Nenhum veículo adicionado. Explore a vitrine e escolha seu próximo carro.</p>
      ) : (
        <div className="mt-6 sm:mt-8 space-y-4 sm:space-y-5">
          {items.map((item) => {
            const key = getProductKey(item.product);
            return (
            <div
              key={key}
              className="flex flex-col sm:flex-row sm:items-center gap-4 rounded-xl border p-4 sm:p-5 bg-white/50"
            >
              <div className="flex-1 min-w-0">
                <p className="font-medium text-purple-600 truncate">
                  {item.product.brand} {item.product.modelName} ({item.product.year})
                </p>
                <p className="text-sm text-gray-900 mt-1">
                  Tipo: {item.product.type}
                </p>
                <p className="mt-1 text-sm text-gray-900">
                  {formatBRL(item.product.value)} cada
                </p>
              </div>
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="flex items-center gap-2">
                  <label className="text-sm text-gray-900 whitespace-nowrap">Qtd:</label>
                  <input
                    type="number"
                    min={1}
                    value={item.quantity}
                    onChange={(e) => setQty(key, Number(e.target.value))}
                    className="w-16 sm:w-20 rounded-lg border border-gray-300 px-2 py-1 text-center shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                <button
                  onClick={() => remove(key)}
                  className="text-sm text-red-600 hover:text-red-700 whitespace-nowrap font-medium"
                >
                  Remover
                </button>
              </div>
            </div>
          )})}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-t pt-4 sm:pt-5">
            <p className="text-xl sm:text-2xl font-semibold text-purple-600">
              Total: {formatBRL(total)}
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => clear()}
                className="w-full sm:w-auto rounded-lg border border-gray-300 px-4 py-2 text-sm hover:bg-gray-50 transition-colors"
              >
                Limpar carrinho
              </button>
              <button
                onClick={() => alert("Fluxo de checkout pendente (mock)")}
                className="w-full sm:w-auto rounded-lg bg-gray-900 px-6 py-2.5 text-sm font-medium text-white shadow hover:bg-black transition-colors"
              >
                Finalizar compra
              </button>
            </div>
          </div>
        </div>
      )}
    </MainStyle>
  );
}
