import { Topic } from "@/types/topic";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

export const useGetTopicById: (topicId: string) => Promise<Topic> = async (
  topicId
) => {
  const response = await fetch(`${API_BASE_URL}/topics/${topicId}`);

  if (!response.ok) {
    throw new Error("Erro ao buscar tópico");
  }

  return response.json();
};
