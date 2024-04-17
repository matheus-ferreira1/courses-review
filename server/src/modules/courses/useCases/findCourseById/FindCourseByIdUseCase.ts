import { Course, Review } from "@prisma/client";
import { AppError } from "../../../../shared/errors/AppError";
import { CourseRepository } from "../../repository/CourseRepository";

export class FindCourseByIdUseCase {
  constructor(private courseRepository: CourseRepository) {}

  async execute(courseId: string) {
    const course = await this.courseRepository.findCourseById(courseId);

    if (!course) {
      throw new AppError("Course not found", 404);
    }

    const courseWithReviews = course as Course & { reviews: Review[] };
    const numberOfReviews = courseWithReviews.reviews.length;
    const totalRating = courseWithReviews.reviews.reduce(
      (acc, review) => acc + review.rating,
      0
    );
    const averageRating =
      numberOfReviews > 0 ? totalRating / numberOfReviews : 0;

    return { ...course, averageRating };
  }
}
