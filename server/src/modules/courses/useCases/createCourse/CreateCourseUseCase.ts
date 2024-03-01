import { Course } from "@prisma/client";

import { AppError } from "../../../../shared/errors/AppError";
import { CourseRepository } from "../../repository/CourseRepository";
import { EducatorRepository } from "src/modules/educators/repository/EducatorRepository";

type CreateCourseDTO = {
  title: string;
  description: string;
  educatorId: string;
  price: number;
  topicId: string;
  tags: string[];
};

export class CreateCourseUseCase {
  constructor(
    private courseRepository: CourseRepository,
    private educatorRepository: EducatorRepository
  ) {}

  async execute({
    title,
    description,
    educatorId,
    price,
    topicId,
    tags,
  }: CreateCourseDTO): Promise<Course> {
    const educator = await this.educatorRepository.findEducatorById(educatorId);
    if (!educator) {
      throw new AppError("Educator not found", 404);
    }

    //check if the topic exists

    const courseAlreadyExists = await this.courseRepository.findCourseByTitle(
      title
    );
    if (courseAlreadyExists) {
      throw new AppError("Course already exists");
    }

    const course = await this.courseRepository.createCourse({
      title,
      description,
      educatorId,
      price,
      topicId,
      tags,
    });

    return course;
  }
}
