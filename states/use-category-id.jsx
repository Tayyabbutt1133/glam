import { create } from "zustand";

export const useCategoryIdState = create((set) => ({
  categoryId: null,
  setCategoryId: (id) => set({ categoryId: id})
}));