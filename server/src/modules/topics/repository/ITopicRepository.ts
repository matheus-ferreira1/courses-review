import { Topic } from "@prisma/client";

export type CreateTopicDTO = {
  name: string;
};

export type FeaturedTopicsDTO = {
  id: string;
  name: string;
  _count: {
    courses: number;
  };
};

export interface ITopicRepository {
  createTopic(data: CreateTopicDTO): Promise<Topic>;
  listTopics(): Promise<Topic[]>;
  findTopicById(id: string): Promise<Topic | null>;
  findTopicByName(name: string): Promise<Topic | null>;
}
