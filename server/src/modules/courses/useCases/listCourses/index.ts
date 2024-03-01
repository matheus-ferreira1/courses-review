import { CourseRepository } from "../../repository/CourseRepository";
import { ListCoursesController } from "../listCourses/ListCoursesController";
import { ListCoursesUseCase } from "../listCourses/ListCoursesUseCase";

const courseRepository = CourseRepository.getInstance();
const listCoursesUseCase = new ListCoursesUseCase(courseRepository);
export const listCoursesController = new ListCoursesController(
  listCoursesUseCase
);
