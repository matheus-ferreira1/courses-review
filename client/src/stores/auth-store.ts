import { create } from "zustand";

export interface User {
  id: string;
  name: string;
  email: string;
}

interface IAuthStore {
  isLoggedIn: () => boolean;
  user: User | null;
  setUser: (user: User | null) => void;
  token: string | null;
  setToken: (token: string | null) => void;
  logout: () => void;
}

export const useAuthStore = create<IAuthStore>((set) => ({
  isLoggedIn: () => Boolean(localStorage.getItem("access-token")),
  user: JSON.parse(localStorage.getItem("app-user") || "null"),
  setUser: (user) => {
    localStorage.setItem("app-user", JSON.stringify(user));
    set({ user });
  },
  token: localStorage.getItem("access-token"),
  setToken: (token) => {
    localStorage.setItem("access-token", token || "");
    set({ token });
  },
  logout: () => {
    localStorage.removeItem("access-token");
    localStorage.removeItem("app-user");
    set({ user: null, token: null });
  },
}));
