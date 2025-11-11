import { useCartStore } from "~/store/cart";
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
      <h1 className="text-3xl font-semibold text-purple-600">Seu carrinho</h1>
      {items.length === 0 ? (
        <p className="mt-6 text-gray-900">Nenhum veículo adicionado. Explore a vitrine e escolha seu próximo carro.</p>
      ) : (
        <div className="mt-8 space-y-5">
          {items.map((item) => (
            <div
              key={item.product.id}
              className="flex flex-col sm:flex-row sm:items-center gap-4 rounded-xl border p-5 bg-white/50"
            >
              <div className="flex-1">
                <p className="font-medium text-purple-600">
                  {item.product.name} ({item.product.year})
                </p>
                <p className="text-sm text-gray-900">
                  {item.product.brand} • {item.product.fuel} • {item.product.transmission}
                </p>
                <p className="mt-1 text-sm text-gray-900">
                  {formatBRL(item.product.price)} cada
                </p>
              </div>
              <div className="flex items-center gap-3">
                <label className="text-sm text-gray-900">Qtd:</label>
                <input
                  type="number"
                  min={1}
                  value={item.quantity}
                  onChange={(e) => setQty(item.product.id, Number(e.target.value))}
                  className="w-20 rounded-lg border border-gray-300 px-2 py-1 text-center shadow-sm"
                />
                <button
                  onClick={() => remove(item.product.id)}
                  className="text-sm text-red-600 hover:text-red-700"
                >
                  Remover
                </button>
              </div>
            </div>
          ))}
          <div className="flex items-center justify-between border-t pt-5">
            <p className="text-xl font-semibold text-purple-600">
              Total: {formatBRL(total)}
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => clear()}
                className="rounded-lg border border-gray-300 px-4 py-2 text-sm hover:bg-gray-50"
              >
                Limpar
              </button>
              <button
                onClick={() => alert("Fluxo de checkout pendente (mock)")}
                className="rounded-lg bg-gray-900 px-6 py-2.5 text-sm font-medium text-white shadow hover:bg-black"
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
