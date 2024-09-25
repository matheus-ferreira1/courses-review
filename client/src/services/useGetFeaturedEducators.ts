import { Educator } from "@/types/educator";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

export const useGetFeaturedEducators: () => Promise<Educator[]> = async () => {
  const response = await fetch(`${API_BASE_URL}/educators/featured`);

  if (!response.ok) {
    throw new Error("Erro ao buscar principais educadores");
  }

  return response.json();
};
