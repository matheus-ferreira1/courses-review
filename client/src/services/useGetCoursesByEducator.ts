import { Course } from "@/types/course";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

export const useGetCoursesByEducator: (
  educatorId: string
) => Promise<Course[]> = async (educatorId) => {
  const response = await fetch(`${API_BASE_URL}/courses/${educatorId}`);

  if (!response.ok) {
    throw new Error("Erro ao buscar cursos do educador.");
  }

  return response.json();
};
