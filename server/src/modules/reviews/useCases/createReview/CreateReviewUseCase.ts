import { Review } from "@prisma/client";

import { AppError } from "../../../../shared/errors/AppError";

import { CourseRepository } from "../../../courses/repository/CourseRepository";
import { UserRepository } from "../../../users/repository/UserRepository";
import { CreateReviewDTO } from "../../repository/IReviewRepository";
import { ReviewRepository } from "../../repository/ReviewRepository";

export class CreateReviewUseCase {
  constructor(
    private reviewRepository: ReviewRepository,
    private userRepository: UserRepository,
    private courseRepository: CourseRepository
  ) {}

  async execute({
    courseId,
    userId,
    rating,
    description,
  }: CreateReviewDTO): Promise<Review> {
    const user = await this.userRepository.findUserById(userId);
    if (!user) {
      throw new AppError("User not found", 404);
    }

    const course = await this.courseRepository.findCourseById(courseId);
    if (!course) {
      throw new AppError("Course not found", 404);
    }

    const review = await this.reviewRepository.createReview({
      courseId,
      userId,
      rating,
      description,
    });

    return review;
  }
}
