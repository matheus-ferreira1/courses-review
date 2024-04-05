import { Review } from "@prisma/client";

import { CreateReviewDTO, IReviewRepository } from "./IReviewRepository";
import { prisma } from "../../../db";

export class ReviewRepository implements IReviewRepository {
  private static instance: ReviewRepository;

  private constructor() {}

  public static getInstance(): ReviewRepository {
    if (!ReviewRepository.instance) {
      ReviewRepository.instance = new ReviewRepository();
    }
    return ReviewRepository.instance;
  }

  async listReviewsByCourse(courseId: string): Promise<Review[]> {
    const reviews = await prisma.review.findMany({
      where: {
        courseId,
      },
    });
    return reviews;
  }

  async createReview({
    courseId,
    userId,
    rating,
    description,
  }: CreateReviewDTO): Promise<Review> {
    const review = await prisma.review.create({
      data: {
        courseId,
        userId,
        rating: Number(rating),
        description,
      },
    });

    return review;
  }
}
