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
  findUserById(id: number): Promise<PrismaUser | null>;
  updateUser(id: number, data: PrismaUser): Promise<PrismaUser>;
  deleteUser(id: number): Promise<PrismaUser>;
}
