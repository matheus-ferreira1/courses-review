import { TopicRepository } from "../../repository/TopicRepository";

export class FindTopicByIdUseCase {
  constructor(private topicRepository: TopicRepository) {}

  async execute(topicId: string) {
    const topic = await this.topicRepository.findTopicById(topicId);

    return topic;
  }
}
