import { EducatorRepository } from "../../repository/EducatorRepository";
import { FindEducatorByIdController } from "./FindEducatorByIdController";
import { FindEducatorByIdUseCase } from "./FindEducatorByIdUseCase";

const educatorRepository = EducatorRepository.getInstance();
const findEducatorByIdUseCase = new FindEducatorByIdUseCase(educatorRepository);
export const findEducatorByIdController = new FindEducatorByIdController(
  findEducatorByIdUseCase
);
