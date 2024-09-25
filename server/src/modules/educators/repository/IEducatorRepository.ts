import { Educator } from "@prisma/client";

export type CreateEducatorDTO = {
  name: string;
  description: string;
  authorId: string;
  imgUrl?: string;
};

export type FeaturedEducatorsDTO = {
  id: string;
  name: string;
  _count: {
    courses: number;
  };
};

export interface IEducatorRepository {
  createEducator(data: CreateEducatorDTO): Promise<Educator>;
  listEducators(): Promise<Educator[]>;
  findEducatorByName(name: string): Promise<Educator | null>;
  findEducatorByNameAutocomplete(name: string): Promise<Educator[] | null>;
  findEducatorById(id: string): Promise<Educator | null>;
}
