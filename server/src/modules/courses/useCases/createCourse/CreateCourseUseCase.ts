import { Course } from "@prisma/client";

import { AppError } from "../../../../shared/errors/AppError";

import { CourseRepository } from "../../repository/CourseRepository";
import { EducatorRepository } from "../../../educators/repository/EducatorRepository";
import { TopicRepository } from "../../../topics/repository/TopicRepository";

type CreateCourseDTO = {
  title: string;
  description: string;
  educatorName: string;
  price: number;
  topicName: string;
  tags: string;
};

export class CreateCourseUseCase {
  constructor(
    private courseRepository: CourseRepository,
    private educatorRepository: EducatorRepository,
    private topicRepository: TopicRepository
  ) {}

  async execute({
    title,
    description,
    educatorName,
    price,
    topicName,
    tags,
  }: CreateCourseDTO): Promise<Course> {
    const educator = await this.educatorRepository.findEducatorByName(
      educatorName
    );
    if (!educator) {
      throw new AppError("Educator not found", 404);
    }

    const topic = await this.topicRepository.findTopicByName(topicName);
    if (!topic) {
      throw new AppError("Topic not found", 404);
    }

    const courseAlreadyExists = await this.courseRepository.findCourseByTitle(
      title
    );
    if (courseAlreadyExists) {
      throw new AppError("Course already exists");
    }

    const course = await this.courseRepository.createCourse({
      title,
      description,
      educatorId: educator.id,
      price,
      topicId: topic.id,
      tags,
    });

    return course;
  }
}
