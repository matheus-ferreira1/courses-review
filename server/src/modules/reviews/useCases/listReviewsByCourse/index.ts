import { ReviewRepository } from "../../repository/ReviewRepository";
import { ListReviewsByCourseController } from "./ListReviewsByCourseController";
import { ListReviewsByCourseUseCase } from "./ListReviewsByCourseUseCase";

const reviewRepository = ReviewRepository.getInstance();
const listReviewsByCourseUseCase = new ListReviewsByCourseUseCase(
  reviewRepository
);
export const listReviewsByCourseController = new ListReviewsByCourseController(
  listReviewsByCourseUseCase
);
