import { Course } from "@/types/course";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

export const useGetCoursesByTopic: (
  topicId: string
) => Promise<Course[]> = async (topicId) => {
  const response = await fetch(`${API_BASE_URL}/courses/by-topic/${topicId}`);

  if (!response.ok) {
    throw new Error("Erro ao buscar cursos");
  }

  return response.json();
};
