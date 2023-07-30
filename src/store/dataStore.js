import { create } from "zustand";
import axios from "axios";
import BASE from "../utils/API";

export const useDataStore = create((set) => ({
  data: [],
  setData: (userData) => set({ data: userData }),
  addUser: async (user) => {
    try {
      const response = await axios.post(`${BASE}/api/data`, user);
      set((state) => ({ data: [...state.data, response.data] }));
    } catch (error) {
      console.error("Error adding user:", error);
    }
  },
  removeUser: async (id) => {
    try {
      await axios.delete(`${BASE}/api/data/${id}`);
      set((state) => ({
        data: state.data.filter((item) => item.id !== id),
      }));
    } catch (error) {
      console.error("Error removing user:", error);
    }
  },
  updateUser: async (id, updatedData) => {
    try {
      await axios.put(`${BASE}/api/data/${id}`, updatedData);
      set((state) => ({
        data: state.data.map((item) =>
          item.id === id ? { ...item, ...updatedData } : item
        ),
      }));
    } catch (error) {
      console.error("Error updating user:", error);
    }
  },
}));
