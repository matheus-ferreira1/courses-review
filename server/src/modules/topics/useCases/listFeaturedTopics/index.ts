import { TopicRepository } from "../../repository/TopicRepository";
import { ListFeaturedTopicsController } from "./ListFeaturedTopicsController";
import { ListFeaturedTopicsUseCase } from "./ListFeaturedTopicsUseCase";

const topicRepository = TopicRepository.getInstance();
const listFeaturedTopicsUseCase = new ListFeaturedTopicsUseCase(
  topicRepository
);
export const listFeaturedTopicsController = new ListFeaturedTopicsController(
  listFeaturedTopicsUseCase
);
