import { UserRepository } from "../../repository/UserRepository";
import { UpdateUserProfileUseCase } from "./updateUserProfileUseCase";
import { UpdateUserProfileController } from "./updateUserProfileController";

const userRepository = UserRepository.getInstance();
const updateUserProfileUseCase = new UpdateUserProfileUseCase(userRepository);
export const updateUserProfileController = new UpdateUserProfileController(
  updateUserProfileUseCase
);
