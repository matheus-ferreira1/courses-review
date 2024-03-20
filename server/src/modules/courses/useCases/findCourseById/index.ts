import { CourseRepository } from "../../repository/CourseRepository";
import { FindCourseByIdController } from "./FindCourseByIdController";
import { FindCourseByIdUseCase } from "./FindCourseByIdUseCase";

const courseRepository = CourseRepository.getInstance();
const findCourseByIdUseCase = new FindCourseByIdUseCase(courseRepository);
export const findCourseByIdController = new FindCourseByIdController(
  findCourseByIdUseCase
);
