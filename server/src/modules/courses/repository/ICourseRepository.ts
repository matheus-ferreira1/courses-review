import { Course } from "@prisma/client";

export type CreateCourseDTO = {
  title: string;
  description: string;
  price: number;
  educatorId: string;
  topicId: string;
  tags: string;
};

export interface ICourseRepository {
  createCourse(data: CreateCourseDTO): Promise<Course>;
  listCourses(): Promise<Course[]>;
  findCourseByTopic(topicId: string): Promise<Course[] | null>;
  findCourseById(id: string): Promise<Course | null>;
  findCourseByEducator(educatorId: string): Promise<Course[] | null>;
}
