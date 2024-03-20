import { AppError } from "../../../../shared/errors/AppError";

import { TopicRepository } from "../../../topics/repository/TopicRepository";
import { CourseRepository } from "../../repository/CourseRepository";

export class FindCourseByTopicUseCase {
  constructor(
    private courseRepository: CourseRepository,
    private topicRepository: TopicRepository
  ) {}

  async execute(topicId: string) {
    const topic = await this.topicRepository.findTopicById(topicId);
    if (!topic) {
      throw new AppError("Topic not found", 404);
    }

    const courses = await this.courseRepository.findCourseByTopic(topicId);

    return courses;
  }
}
