import { UserRepository } from "../../repository/UserRepository";
import { RegisterUserUseCase } from "./RegisterUserUseCase";
import { RegisterUserController } from "./RegisterUserController";

const userRepository = UserRepository.getInstance();
const registerUserUseCase = new RegisterUserUseCase(userRepository);
export const registerUserController = new RegisterUserController(
  registerUserUseCase
);
