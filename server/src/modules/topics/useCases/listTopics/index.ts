import { TopicRepository } from "../../repository/TopicRepository";
import { ListTopicsController } from "./ListTopicsController";
import { ListTopicsUseCase } from "./ListTopicsUseCase";

const topicRepository = TopicRepository.getInstance();
const listTopicsUseCase = new ListTopicsUseCase(topicRepository);
export const listTopicsController = new ListTopicsController(listTopicsUseCase);
