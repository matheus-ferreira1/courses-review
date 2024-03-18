import { Educator } from "@prisma/client";

export type CreateEducatorDTO = {
  name: string;
  description: string;
  authorId: string;
  imgUrl?: string;
};

export interface IEducatorRepository {
  createEducator(data: CreateEducatorDTO): Promise<Educator>;
  listEducators(): Promise<Educator[]>;
  findEducatorByName(name: string): Promise<Educator | null>;
  findEducatorById(id: string): Promise<Educator | null>;
}
