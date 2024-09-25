import { Topic } from "@prisma/client";
import { TopicRepository } from "../../repository/TopicRepository";

export class ListFeaturedTopicsUseCase {
  constructor(private TopicRepository: TopicRepository) {}

  async execute(): Promise<Topic[]> {
    const featuredTopics = await this.TopicRepository.listFeaturedTopics();

    return featuredTopics;
  }
}
