import { Educator } from "@prisma/client";
import { CreateEducatorDTO, IEducatorRepository } from "./IEducatorRepository";
import { prisma } from "../../../db";

export class EducatorRepository implements IEducatorRepository {
  private static instance: EducatorRepository;

  private constructor() {}

  public static getInstance(): EducatorRepository {
    if (!EducatorRepository.instance) {
      EducatorRepository.instance = new EducatorRepository();
    }
    return EducatorRepository.instance;
  }

  async createEducator({
    description,
    name,
    authorId,
  }: CreateEducatorDTO): Promise<Educator> {
    const educator = await prisma.educator.create({
      data: {
        name,
        description,
        authorId: authorId,
      },
    });

    return educator;
  }

  async listEducators(): Promise<Educator[]> {
    const educators = await prisma.educator.findMany();

    return educators;
  }

  async findEducatorByName(name: string): Promise<Educator | null> {
    const educator = await prisma.educator.findFirst({
      where: {
        name,
      },
    });

    return educator;
  }
}
