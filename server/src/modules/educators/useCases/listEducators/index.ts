import { ListEducatorsUseCase } from "./listEducatorsUseCase";
import { ListEducatorsController } from "./listEducatorsController";
import { EducatorRepository } from "../../repository/EducatorRepository";

const educatorRepository = EducatorRepository.getInstance();
const listEducatorsUseCase = new ListEducatorsUseCase(educatorRepository);
export const listEducatorsController = new ListEducatorsController(
  listEducatorsUseCase
);
