import { create, type StateCreator } from "zustand";
import type { CarProduct } from "~/types/product";
import toast from "react-hot-toast";

export type CartItem = {
  product: CarProduct;
  quantity: number;
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
    set((state: CartState) => {
      const existing = state.items.find((i: CartItem) => i.product.id === product.id);
      if (existing) {
        toast.success(`+${qty} ${product.name} adicionado ao carrinho!`, {
          icon: '🚗',
        });
        return {
          items: state.items.map((i: CartItem) =>
            i.product.id === product.id
              ? { ...i, quantity: i.quantity + qty }
              : i
          ),
        };
      }
      toast.success(`${product.name} adicionado ao carrinho!`, {
        icon: '✅',
      });
      return { items: [...state.items, { product, quantity: qty }] };
    });
  },
  remove: (id: string) => {
    const item = get().items.find((i: CartItem) => i.product.id === id);
    if (item) {
      toast.success(`${item.product.name} removido do carrinho`, {
        icon: '🗑️',
      });
    }
    set((state: CartState) => ({ items: state.items.filter((i: CartItem) => i.product.id !== id) }));
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
    const item = get().items.find((i: CartItem) => i.product.id === id);
    if (item && item.quantity !== newQty) {
      toast.success(`Quantidade atualizada para ${newQty}`, {
        icon: '🔢',
      });
    }
    set((state: CartState) => ({
      items: state.items.map((i: CartItem) =>
        i.product.id === id ? { ...i, quantity: newQty } : i
      ),
    }));
  },
  totalCents: () =>
    get().items.reduce((acc: number, item: CartItem) => acc + item.product.price * item.quantity, 0),
});

export const useCartStore = create<CartState>(creator);
