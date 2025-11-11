import { create, type StateCreator } from "zustand";
import type { CarProduct } from "~/types/product";

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
        return {
          items: state.items.map((i: CartItem) =>
            i.product.id === product.id
              ? { ...i, quantity: i.quantity + qty }
              : i
          ),
        };
      }
      return { items: [...state.items, { product, quantity: qty }] };
    });
  },
  remove: (id: string) =>
    set((state: CartState) => ({ items: state.items.filter((i: CartItem) => i.product.id !== id) })),
  clear: () => set({ items: [] }),
  setQty: (id: string, qty: number) =>
    set((state: CartState) => ({
      items: state.items.map((i: CartItem) =>
        i.product.id === id ? { ...i, quantity: Math.max(1, qty) } : i
      ),
    })),
  totalCents: () =>
    get().items.reduce((acc: number, item: CartItem) => acc + item.product.price * item.quantity, 0),
});

export const useCartStore = create<CartState>(creator);
