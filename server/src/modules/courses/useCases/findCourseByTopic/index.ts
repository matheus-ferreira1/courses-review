import { TopicRepository } from "../../../topics/repository/TopicRepository";
import { CourseRepository } from "../../repository/CourseRepository";
import { FindCourseByTopicController } from "./FindCourseByTopicController";
import { FindCourseByTopicUseCase } from "./FindCourseByTopicUseCase";

const courseRepository = CourseRepository.getInstance();
const topicRepository = TopicRepository.getInstance();
const findCourseByTopicUseCase = new FindCourseByTopicUseCase(
  courseRepository,
  topicRepository
);
export const findCourseByTopicController = new FindCourseByTopicController(
  findCourseByTopicUseCase
);
