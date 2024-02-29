import { User as PrismaUser } from "@prisma/client";

export type CreateUserDTO = {
  name: string;
  email: string;
  password: string;
};

export interface IUserRepository {
  createUser(data: CreateUserDTO): Promise<PrismaUser>;
  listUsers(): Promise<PrismaUser[]>;
  findUserByEmail(email: string): Promise<PrismaUser | null>;
  findUserById(id: string): Promise<PrismaUser | null>;
  updateUser(data: PrismaUser): Promise<PrismaUser>;
  deleteUser(id: string): Promise<PrismaUser>;
}
