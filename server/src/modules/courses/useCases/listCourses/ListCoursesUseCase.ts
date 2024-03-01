import { Course } from "@prisma/client";
import { CourseRepository } from "../../repository/CourseRepository";

export class ListCoursesUseCase {
  constructor(private courseRepository: CourseRepository) {}

  async execute(): Promise<Course[]> {
    const courses = await this.courseRepository.listCourses();

    return courses;
  }
}
