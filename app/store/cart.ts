import { create, type StateCreator } from "zustand";
import type { CarProduct } from "~/types/product";
import toast from "react-hot-toast";

export type CartItem = {
  product: CarProduct;
  quantity: number;
};

// Gera chave única segura para o item (caso backend repita id)
export const getProductKey = (p: CarProduct) => {
  const baseId = (p.id && p.id.trim()) || '';
  if (baseId.length > 0) return baseId;
  return `${p.brand}-${p.modelName}-${p.year}-${p.value}`;
};

type CartState = {
  items: CartItem[];
  add: (product: CarProduct, qty?: number) => void;
  remove: (id: string) => void;
  clear: () => void;
  setQty: (id: string, qty: number) => void;
  totalCents: () => number;
};

const creator: StateCreator<CartState> = (set, get) => ({
  items: [],
  add: (product: CarProduct, qty = 1) => {
    const key = getProductKey(product);
    set((state: CartState) => {
      const existing = state.items.find((i: CartItem) => getProductKey(i.product) === key);
      if (existing) {
        toast.success(`+${qty} ${product.brand} ${product.modelName} adicionado ao carrinho!`, { icon: '🚗' });
        return {
          items: state.items.map((i: CartItem) =>
            getProductKey(i.product) === key ? { ...i, quantity: i.quantity + qty } : i
          ),
        };
      }
      toast.success(`${product.brand} ${product.modelName} adicionado ao carrinho!`, { icon: '✅' });
      return { items: [...state.items, { product, quantity: qty }] };
    });
  },
  remove: (id: string) => {
    const item = get().items.find((i: CartItem) => getProductKey(i.product) === id || i.product.id === id);
    if (item) {
      toast.success(`${item.product.brand} ${item.product.modelName} removido do carrinho`, { icon: '🗑️' });
    }
    set((state: CartState) => ({
      items: state.items.filter((i: CartItem) => getProductKey(i.product) !== id && i.product.id !== id),
    }));
  },
  clear: () => {
    if (get().items.length > 0) {
      toast.success('Carrinho limpo!', {
        icon: '🧹',
      });
    }
    set({ items: [] });
  },
  setQty: (id: string, qty: number) => {
    const newQty = Math.max(1, qty);
    const item = get().items.find((i: CartItem) => getProductKey(i.product) === id || i.product.id === id);
    if (item && item.quantity !== newQty) {
      toast.success(`Quantidade atualizada para ${newQty}`, { icon: '🔢' });
    }
    set((state: CartState) => ({
      items: state.items.map((i: CartItem) =>
        getProductKey(i.product) === id || i.product.id === id ? { ...i, quantity: newQty } : i
      ),
    }));
  },
  totalCents: () =>
    get().items.reduce((acc: number, item: CartItem) => acc + item.product.value * item.quantity, 0),
});

export const useCartStore = create<CartState>(creator);
