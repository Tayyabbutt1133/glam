import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useCartStore = create(
  persist(
    (set, get) => ({
      cartItems: [],
      savedItems: [],
      orderDetails: null,
      addToCart: (product) =>
        set((state) => {
          const existingItem = state.cartItems.find((item) => item.id === product.id)
          if (existingItem) {
            return {
              cartItems: state.cartItems.map((item) =>
                item.id === product.id
                  ? { ...item, quantity: item.quantity + 1 }
                  : item
              ),
            }
          }
          return { cartItems: [...state.cartItems, { ...product, quantity: 1 }] }
        }),
      removeFromCart: (productId) =>
        set((state) => ({
          cartItems: state.cartItems.filter((item) => item.id !== productId),
        })),
      updateQuantity: (productId, quantity) =>
        set((state) => ({
          cartItems: state.cartItems.map((item) =>
            item.id === productId ? { ...item, quantity } : item
          ),
        })),
      clearCart: () => set({ cartItems: [] }),
      saveForLater: (productId) =>
        set((state) => {
          const itemToSave = state.cartItems.find((item) => item.id === productId)
          if (itemToSave) {
            return {
              cartItems: state.cartItems.filter((item) => item.id !== productId),
              savedItems: [...state.savedItems, itemToSave],
            }
          }
          return state
        }),
      editItem: (updatedItem) =>
        set((state) => ({
          cartItems: state.cartItems.map((item) =>
            item.id === updatedItem.id ? { ...item, ...updatedItem } : item
          ),
        })),
      setOrderDetails: (details) => set({ orderDetails: details }),
      getOrderDetails: () => get().orderDetails,
      clearOrderDetails: () => set({ orderDetails: null }),
    }),
    {
      name: 'cart-storage',
    }
  )
)