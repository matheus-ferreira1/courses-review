import { User as PrismaUser } from "@prisma/client";

import { CreateUserDTO, IUserRepository } from "./IUserRepository";
import { prisma } from "../../../db";

export class UserRepository implements IUserRepository {
  private static instance: UserRepository;

  private constructor() {}

  public static getInstance(): UserRepository {
    if (!UserRepository.instance) {
      UserRepository.instance = new UserRepository();
    }
    return UserRepository.instance;
  }

  async createUser({
    name,
    email,
    password,
  }: CreateUserDTO): Promise<PrismaUser> {
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password,
      },
    });

    return user;
  }

  async listUsers(): Promise<PrismaUser[]> {
    const users = await prisma.user.findMany();
    return users;
  }

  async findUserByEmail(email: string): Promise<PrismaUser | null> {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    return user;
  }

  async findUserById(id: number): Promise<PrismaUser | null> {
    const user = await prisma.user.findUnique({
      where: {
        id: Number(id),
      },
    });

    return user;
  }

  async updateUser(id: number, data: PrismaUser): Promise<PrismaUser> {
    const user = await prisma.user.update({
      where: {
        id: Number(id),
      },
      data,
    });

    return user;
  }

  async deleteUser(id: number): Promise<PrismaUser> {
    const user = await prisma.user.delete({
      where: {
        id: Number(id),
      },
    });

    return user;
  }
}
