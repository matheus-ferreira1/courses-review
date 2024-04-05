import { ReviewRepository } from "../../repository/ReviewRepository";

export class ListReviewsByCourseUseCase {
  constructor(private reviewRepository: ReviewRepository) {}

  async execute(courseId: string) {
    const reviews = await this.reviewRepository.listReviewsByCourse(courseId);

    return reviews;
  }
}
