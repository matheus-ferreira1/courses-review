import { Topic } from "@prisma/client";
import { TopicRepository } from "../../repository/TopicRepository";
import { AppError } from "../../../../shared/errors/AppError";

type createTopicDTO = {
  name: string;
};

export class CreateTopicUseCase {
  constructor(private topicRepository: TopicRepository) {}

  async execute({ name }: createTopicDTO): Promise<Topic> {
    const topicAlreadyExists = await this.topicRepository.findTopicByName(name);
    if (topicAlreadyExists) {
      throw new AppError("Topic already exists");
    }

    const topic = await this.topicRepository.createTopic({
      name,
    });

    return topic;
  }
}
