import { CourseRepository } from "../../repository/CourseRepository";

export class FindCourseByEducatorUseCase {
  constructor(private courseRepository: CourseRepository) {}

  async execute(educatorId: string) {
    const courses = await this.courseRepository.findCourseByEducator(
      educatorId
    );

    return courses;
  }
}
