import { UserRepository } from "../../repository/UserRepository";
import { LoginUserController } from "./LoginUserController";
import { LoginUserUseCase } from "./LoginUserUseCase";

const userRepository = UserRepository.getInstance();
const loginUserUseCase = new LoginUserUseCase(userRepository);
export const loginUserController = new LoginUserController(loginUserUseCase);
