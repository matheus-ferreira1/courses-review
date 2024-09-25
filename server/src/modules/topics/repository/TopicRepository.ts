import { Topic } from "@prisma/client";
import { prisma } from "../../../db";
import {
  CreateTopicDTO,
  FeaturedTopicsDTO,
  ITopicRepository,
} from "./ITopicRepository";

export class TopicRepository implements ITopicRepository {
  private static INSTANCE: TopicRepository;

  private constructor() {}

  public static getInstance(): TopicRepository {
    if (!TopicRepository.INSTANCE) {
      TopicRepository.INSTANCE = new TopicRepository();
    }
    return TopicRepository.INSTANCE;
  }

  async createTopic({ name }: CreateTopicDTO): Promise<Topic> {
    const topic = await prisma.topic.create({
      data: {
        name,
      },
    });

    return topic;
  }

  async listTopics(): Promise<Topic[]> {
    const topics = await prisma.topic.findMany();

    return topics;
  }

  async listFeaturedTopics(): Promise<FeaturedTopicsDTO[]> {
    const featuredTopics = await prisma.topic.findMany({
      take: 5,
      select: {
        id: true,
        name: true,
        _count: {
          select: { courses: true },
        },
      },
      orderBy: {
        courses: {
          _count: "desc",
        },
      },
    });

    return featuredTopics;
  }

  async findTopicById(id: string): Promise<Topic | null> {
    const topic = await prisma.topic.findUnique({
      where: {
        id,
      },
    });

    return topic;
  }

  async findTopicByName(name: string): Promise<Topic | null> {
    const topic = await prisma.topic.findFirst({
      where: {
        name,
      },
    });

    return topic;
  }
}
