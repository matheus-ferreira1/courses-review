import { create } from "zustand";

export interface User {
  id: string;
  name: string;
  email: string;
}

interface IAuthStore {
  isLoggedIn: boolean;
  user: User | null;
  token: string | null;
  setAuth: (user: User | null, token: string | null) => void;
  logout: () => void;
  checkAccessToken: () => void;
}

export const useAuthStore = create<IAuthStore>((set) => ({
  isLoggedIn: false,
  user: JSON.parse(localStorage.getItem("app-user") || "null"),
  token: localStorage.getItem("access-token"),
  logout: () => {
    localStorage.removeItem("access-token");
    localStorage.removeItem("app-user");
    set({ user: null, token: null, isLoggedIn: false });
  },
  setAuth: (user, token) => {
    localStorage.setItem("app-user", JSON.stringify(user));
    localStorage.setItem("access-token", token || "");
    set({ user, token, isLoggedIn: true });
  },
  checkAccessToken: async () => {
    const token = localStorage.getItem("access-token");
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/users/validate-token`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.ok) {
        set({ isLoggedIn: true });
      } else {
        set({ isLoggedIn: false });
        set({ user: null, token: null });
      }
    } catch (error) {
      console.log(error);
    }
  },
}));
