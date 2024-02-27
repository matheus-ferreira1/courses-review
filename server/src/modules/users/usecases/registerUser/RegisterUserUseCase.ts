import { hash } from "bcryptjs";
import { User as PrismaUser } from "@prisma/client";

import { AppError } from "../../../../shared/errors/AppError";

import { UserRepository } from "../../repository/UserRepository";

type CreateUserDTO = {
  name: string;
  email: string;
  password: string;
};

export class RegisterUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute({ name, email, password }: CreateUserDTO): Promise<PrismaUser> {
    const userAlreadyExists = await this.userRepository.findUserByEmail(email);

    if (userAlreadyExists) {
      throw new AppError("Email address already used");
    }

    const hashedPassword = await hash(password, 10);
    const user = await this.userRepository.createUser({
      name,
      email,
      password: hashedPassword,
    });
    return user;
  }
}
