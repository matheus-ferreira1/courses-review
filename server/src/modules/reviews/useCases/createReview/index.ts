import { UserRepository } from "../../../users/repository/UserRepository";
import { ReviewRepository } from "../../repository/ReviewRepository";
import { CourseRepository } from "../../../courses/repository/CourseRepository";
import { CreateReviewUseCase } from "./CreateReviewUseCase";
import { CreateReviewController } from "./CreateReviewController";

const reviewRepository = ReviewRepository.getInstance();
const userRepository = UserRepository.getInstance();
const courseRepository = CourseRepository.getInstance();
const createReviewUseCase = new CreateReviewUseCase(
  reviewRepository,
  userRepository,
  courseRepository
);
export const createReviewController = new CreateReviewController(
  createReviewUseCase
);
