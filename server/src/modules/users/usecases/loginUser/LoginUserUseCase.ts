import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";

import { User as PrismaUser } from "@prisma/client";

import { AppError } from "../../../../shared/errors/AppError";

import { UserRepository } from "../../repository/UserRepository";

import jwtConfig from "../../../../config/auth";

type LoginUserDTO = {
  email: string;
  password: string;
};

type IResponse = {
  user: PrismaUser;
  token: string;
};

export class LoginUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute({ email, password }: LoginUserDTO): Promise<IResponse> {
    const user = await this.userRepository.findUserByEmail(email);
    if (!user) {
      throw new AppError("Incorrect email/password combination", 401);
    }

    const passwordMatch = await compare(password, user.password);
    if (!passwordMatch) {
      throw new AppError("Incorrect email/password combination", 401);
    }

    const token = sign({}, jwtConfig.jwt.secret, {
      subject: user.id,
      expiresIn: jwtConfig.jwt.expiresIn,
    });

    return { user, token };
  }
}
