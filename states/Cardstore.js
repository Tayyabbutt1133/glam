import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useCartStore = create(
  persist(
    (set, get) => ({
      cartItems: [],
      savedItems: [],
      orderDetails: null,
      addToCart: (product, quantity = 1) =>
        set((state) => {
          const existingItem = state.cartItems.find(
            (item) => item.databaseId === product.databaseId,
          );
          if (existingItem) {
            return {
              cartItems: state.cartItems.map((item) =>
                item.databaseId === product.databaseId
                  ? { ...item, quantity: item.quantity + quantity }
                  : item,
              ),
            };
          }
          return { cartItems: [...state.cartItems, { ...product, quantity }] };
        }),

      removeFromCart: (productId) =>
        set((state) => ({
          cartItems: state.cartItems.filter(
            (item) => item.databaseId !== productId,
          ),
        })),

      updateQuantity: (productId, quantity) =>
        set((state) => ({
          cartItems: state.cartItems.map((item) =>
            item.databaseId === productId ? { ...item, quantity } : item,
          ),
        })),

      clearCart: () => set({ cartItems: [] }),

      saveForLater: (productId) =>
        set((state) => {
          const itemToSave = state.cartItems.find(
            (item) => item.databaseId === productId,
          );
          if (itemToSave) {
            return {
              cartItems: state.cartItems.filter(
                (item) => item.databaseId !== productId,
              ),
              savedItems: [...state.savedItems, itemToSave],
            };
          }
          return state;
        }),

      editItem: (updatedItem) =>
        set((state) => ({
          cartItems: state.cartItems.map((item) =>
            item.databaseId === updatedItem.databaseId
              ? { ...item, ...updatedItem }
              : item,
          ),
        })),

      setOrderDetails: (details) => set({ orderDetails: details }),
      getOrderDetails: () => get().orderDetails,
      clearOrderDetails: () => set({ orderDetails: null }),
    }),
    {
      name: "cart-storage",
    },
  ),
);
