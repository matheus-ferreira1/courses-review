import { EducatorRepository } from "../../../educators/repository/EducatorRepository";
import { CourseRepository } from "../../repository/CourseRepository";
import { TopicRepository } from "../../../topics/repository/TopicRepository";

import { CreateCourseUseCase } from "./CreateCourseUseCase";
import { CreateCourseController } from "./CreateCourseController";

const courseRepository = CourseRepository.getInstance();
const educatorRepository = EducatorRepository.getInstance();
const topicRepository = TopicRepository.getInstance();

const createCourseUseCase = new CreateCourseUseCase(
  courseRepository,
  educatorRepository,
  topicRepository
);
export const createCourseController = new CreateCourseController(
  createCourseUseCase
);
