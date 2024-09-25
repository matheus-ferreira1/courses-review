import { Topic } from "@/types/topic";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

export const useGetFeaturedTopics: () => Promise<Topic[]> = async () => {
  const response = await fetch(`${API_BASE_URL}/topics/featured`);

  if (!response.ok) {
    throw new Error("Erro ao buscar tópicos");
  }

  return response.json();
};
