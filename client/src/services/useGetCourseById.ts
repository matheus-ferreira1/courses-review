import { Course } from "@/types/course";
import { Review } from "@/types/review";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

export const useGetCourseById: (
  courseId: string
) => Promise<Course & Review[]> = async (courseId) => {
  const response = await fetch(`${API_BASE_URL}/courses/by-id/${courseId}`);

  if (!response.ok) {
    throw new Error("Erro ao buscar curso");
  }

  return response.json();
};
