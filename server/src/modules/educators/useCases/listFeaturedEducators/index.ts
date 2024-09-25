import { EducatorRepository } from "../../repository/EducatorRepository";
import { ListFeaturedEducatorsController } from "./listFeaturedEducatorsController";
import { ListFeaturedEducatorsUseCase } from "./listFeaturedEducatorsUseCase";

const educatorRepository = EducatorRepository.getInstance();
const listFeaturedEducatorsUseCase = new ListFeaturedEducatorsUseCase(
  educatorRepository
);
export const listFeaturedEducatorsController =
  new ListFeaturedEducatorsController(listFeaturedEducatorsUseCase);
