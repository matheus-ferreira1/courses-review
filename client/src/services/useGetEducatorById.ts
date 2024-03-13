import { Educator } from "@/types/educator";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

export const useGetEducatorById: (
  educatorId: string
) => Promise<Educator> = async (educatorId) => {
  const response = await fetch(`${API_BASE_URL}/educators/${educatorId}`);

  if (!response.ok) {
    throw new Error("Erro ao buscar educador");
  }

  return response.json();
};
