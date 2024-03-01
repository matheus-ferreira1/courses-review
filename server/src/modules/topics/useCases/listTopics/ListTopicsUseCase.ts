import { Topic } from "@prisma/client";
import { TopicRepository } from "../../repository/TopicRepository";

export class ListTopicsUseCase {
  constructor(private TopicRepository: TopicRepository) {}

  async execute(): Promise<Topic[]> {
    const topics = await this.TopicRepository.listTopics();

    return topics;
  }
}
