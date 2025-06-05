import { create } from 'zustand';
import { CatalogueItem } from '@/entities/catalogue/catalogue.types.ts';
import { CartItemType } from '@/entities/cart/cart.types.ts';

interface CartState {
  cartItems: CartItemType[];
  addToCart: (item: CatalogueItem) => void;
  removeFromCart: (item: CatalogueItem) => void;
  clearCart: () => void;
  getTotalCount: () => number;
  getTotalPrice: () => number;
  justBought: boolean;
  setJustBought: (b: boolean) => void;
}

const stored = localStorage.getItem('cartItems');

export const useCartStore = create<CartState>((set, get) => ({
  cartItems: stored ? JSON.parse(stored) : [],
  justBought: false,

  addToCart: (item: CatalogueItem) => {
    const existingItems = get().cartItems;
    const existingIndex = existingItems.findIndex((i) => i.id === item.id);
    let updatedCart: CartItemType[] = [];

    if (existingIndex !== -1) {
      const updatedItems = [...existingItems];
      const existingItem = updatedItems[existingIndex];
      existingItem.quantity += 1;
      existingItem.totalPrice = existingItem.quantity * existingItem.price;
      set({ cartItems: updatedItems });
    } else {
      const newItem: CartItemType = {
        ...item,
        quantity: 1,
        totalPrice: item.price,
      };
      updatedCart = [...existingItems, newItem];
    }
    set({ cartItems: updatedCart });

    localStorage.setItem('cartItems', JSON.stringify(updatedCart));
  },

  removeFromCart: (item: CatalogueItem) => {
    const existingItems = get().cartItems;
    const existingIndex = existingItems.findIndex((i) => i.id === item.id);

    if (existingIndex !== -1) {
      const updatedItems = [...existingItems];
      const existingItem = updatedItems[existingIndex];

      if (existingItem.quantity > 1) {
        existingItem.quantity -= 1;
        existingItem.totalPrice = existingItem.quantity * existingItem.price;
      } else {
        updatedItems.splice(existingIndex, 1);
      }

      set({ cartItems: updatedItems });

      localStorage.setItem('cartItems', JSON.stringify(updatedItems));
    }
  },

  clearCart: () => {
    set({ cartItems: [] });
    localStorage.removeItem('cartItems');
  },

  getTotalCount: () => {
    return get().cartItems.reduce((sum, item) => sum + item.quantity, 0);
  },

  getTotalPrice: () => {
    return get().cartItems.reduce((sum, item) => sum + item.totalPrice, 0);
  },

  setJustBought: (b) => set({ justBought: b }),
}));
