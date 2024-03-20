import { TopicRepository } from "../../repository/TopicRepository";
import { FindTopicByIdController } from "./FindTopicByIdController";
import { FindTopicByIdUseCase } from "./FindTopicByIdUseCase";

const topicRepository = TopicRepository.getInstance();
const findTopicByIdUseCase = new FindTopicByIdUseCase(topicRepository);
export const findTopicByIdController = new FindTopicByIdController(
  findTopicByIdUseCase
);
