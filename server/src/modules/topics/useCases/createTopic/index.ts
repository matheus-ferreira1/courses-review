import { TopicRepository } from "../../repository/TopicRepository";
import { CreateTopicController } from "./CreateTopicController";
import { CreateTopicUseCase } from "./CreateTopicUseCase";

const topicRepository = TopicRepository.getInstance();
const createTopicUseCase = new CreateTopicUseCase(topicRepository);
export const createTopicController = new CreateTopicController(
  createTopicUseCase
);
