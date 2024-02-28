import { Educator } from "@prisma/client";

export type CreateEducatorDTO = {
  name: string;
  description: string;
  authorId: number;
};

export interface IEducatorRepository {
  createEducator(data: CreateEducatorDTO): Promise<Educator>;
  listEducators(): Promise<Educator[]>;
  findEducatorByName(name: string): Promise<Educator | null>;
  //   findEducatorById(id: number): Promise<Educator | null>;
  //   updateEducator(id: number, data: Educator): Promise<Educator>;
  //   deleteEducator(id: number): Promise<Educator>;
}
