import { Review } from "@/types/review";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

export const useGetReviewsByCourse: (
  courseId: string
) => Promise<Review[]> = async (courseId) => {
  const response = await fetch(`${API_BASE_URL}/reviews/${courseId}`);

  if (!response.ok) {
    throw new Error("Erro ao buscar avaliações do curso.");
  }

  return response.json();
};
