import { EducatorRepository } from "../../repository/EducatorRepository";
import { FindEducatorByNameUseCase } from "./FindEducatorByNameUseCase";
import { FindEducatorByNameController } from "./FindEducatorByNameController";

const educatorRepository = EducatorRepository.getInstance();
const findEducatorByNameUseCase = new FindEducatorByNameUseCase(
  educatorRepository
);
export const findEducatorByNameController = new FindEducatorByNameController(
  findEducatorByNameUseCase
);
