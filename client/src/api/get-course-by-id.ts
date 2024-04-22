import { api } from "@/lib/axios";
import { Course } from "@/types/course";

export const getCourseById = async (courseId: string) => {
  const response = await api.get<Course>(`/courses/by-id/${courseId}`);

  if (response.status !== 200) {
    throw new Error("Erro ao buscar curso");
  }

  return response.data;
};
