import { Review } from "@prisma/client";

export type CreateReviewDTO = {
  courseId: string;
  userId: string;
  rating: number;
  description: string;
};

export interface IReviewRepository {
  listReviewsByCourse(courseId: string): Promise<Review[]>;
  createReview(data: CreateReviewDTO): Promise<Review>;
  //   findReviewsByCourse(courseId: string): Promise<void>;
  //   findReviewsByUser(userId: string): Promise<void>;
}
