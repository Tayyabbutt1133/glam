// states/useCartStore.js

import create from 'zustand';

export const useCartStore = create((set) => ({
  cartItems: [],
  addToCart: (product) => set((state) => ({
    cartItems: [...state.cartItems, product],
  })),
  removeFromCart: (productId) => set((state) => ({
    cartItems: state.cartItems.filter((item) => item.id !== productId),
  })),
}));
