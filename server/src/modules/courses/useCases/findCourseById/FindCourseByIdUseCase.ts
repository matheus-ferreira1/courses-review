import { CourseRepository } from "../../repository/CourseRepository";

export class FindCourseByIdUseCase {
  constructor(private courseRepository: CourseRepository) {}

  async execute(courseId: string) {
    const course = await this.courseRepository.findCourseById(courseId);

    return course;
  }
}
