import { Course } from "@prisma/client";

import { CreateCourseDTO, ICourseRepository } from "./ICourseRepository";
import { prisma } from "../../../db";

export class CourseRepository implements ICourseRepository {
  private static instance: CourseRepository;

  private constructor() {}

  public static getInstance(): CourseRepository {
    if (!CourseRepository.instance) {
      CourseRepository.instance = new CourseRepository();
    }
    return CourseRepository.instance;
  }

  async createCourse({
    title,
    description,
    educatorId,
    price,
    topicId,
    tags,
  }: CreateCourseDTO): Promise<Course> {
    const course = await prisma.course.create({
      data: {
        title,
        description,
        price,
        educatorId,
        topicId,
        tags: {
          create: tags.map((tag) => ({ name: tag })),
        },
      },
    });

    return course;
  }

  async listCourses(): Promise<Course[]> {
    const courses = await prisma.course.findMany();
    return courses;
  }

  async findCourseByTopic(topicId: string): Promise<Course[] | null> {
    const courses = await prisma.course.findMany({
      where: {
        topicId,
      },
      include: {
        tags: true,
      },
    });

    return courses;
  }

  async findCourseById(id: string): Promise<Course | null> {
    const course = await prisma.course.findUnique({
      where: {
        id,
      },
      include: {
        tags: true,
        educator: true,
      },
    });

    return course;
  }

  async findCourseByEducator(educatorId: string): Promise<Course[] | null> {
    const courses = await prisma.course.findMany({
      where: {
        educatorId,
      },
      include: {
        tags: true,
      },
    });

    return courses;
  }

  async findCourseByTitle(title: string): Promise<Course | null> {
    const course = await prisma.course.findFirst({
      where: {
        title,
      },
    });

    return course;
  }
}
