import { Topic } from "@prisma/client";
import { prisma } from "../../../db";
import { CreateTopicDTO, ITopicRepository } from "./ITopicRepository";

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
