import { EducatorRepository } from "../../repository/EducatorRepository";
import { UserRepository } from "../../../users/repository/UserRepository";

import { CreateEducatorUseCase } from "./createEducatorUseCase";
import { CreateEducatorController } from "./createEducatorController";

const educatorRepository = EducatorRepository.getInstance();
const userRepository = UserRepository.getInstance();
const createEducatorUseCase = new CreateEducatorUseCase(
  educatorRepository,
  userRepository
);
export const createEducatorController = new CreateEducatorController(
  createEducatorUseCase
);
