import { CourseRepository } from "../../repository/CourseRepository";
import { FindCourseByEducatorController } from "./FindCourseByEducatorController";
import { FindCourseByEducatorUseCase } from "./FindCourseByEducatorUseCase";

const courseRepository = CourseRepository.getInstance();
const findCourseByEducatorUseCase = new FindCourseByEducatorUseCase(
  courseRepository
);
export const findCourseByEducatorController =
  new FindCourseByEducatorController(findCourseByEducatorUseCase);
