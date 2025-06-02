import { create } from "zustand";
import type { State } from "../interfaces/State";

export const useUserStore = create<State>((set) => ({
  token: null,
  setToken: (token) => set({ token }),
}));
