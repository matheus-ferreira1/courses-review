import { User } from "@prisma/client";
import { compare, hash } from "bcryptjs";

import { UserRepository } from "../../repository/UserRepository";
import { AppError } from "../../../../shared/errors/AppError";

type UpdateUserProfileDTO = {
  id: string;
  name?: string;
  email?: string;
  password?: string;
  old_password?: string;
};

export class UpdateUserProfileUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute({
    id,
    email,
    name,
    password,
    old_password,
  }: UpdateUserProfileDTO): Promise<User> {
    const user = await this.userRepository.findUserById(id);
    if (!user) {
      throw new AppError("User not found", 404);
    }

    const userUpdateEmail = await this.userRepository.findUserByEmail(email);
    if (userUpdateEmail && userUpdateEmail.id !== id) {
      throw new AppError("Email already in use");
    }

    if (password && old_password) {
      const checkOldPassword = await compare(old_password, user.password);
      if (!checkOldPassword) {
        throw new AppError("Old password does not match");
      }
      user.password = await hash(password, 10);
    }

    user.email = email;
    user.name = name;

    return await this.userRepository.updateUser(user);
  }
}
