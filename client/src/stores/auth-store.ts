import { create } from "zustand";

interface User {
  responseUser: { id: string; name: string; email: string };
  token: string;
}

interface IAuthStore {
  user: User | null;
  isLogged: boolean;
  setUser: (user: User) => void;
  clearUser: () => void;
}

export const useAuthStore = create<IAuthStore>((set) => ({
  user: null,
  isLogged: false,
  setUser: (user) => set({ user, isLogged: true }),
  clearUser: () => set({ user: null, isLogged: false }),
}));
