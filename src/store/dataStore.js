import { create } from "zustand";

export const useDataStore = create((set) => ({
  data: [],
  setData: (userData) => set({ data: userData }),
}));
