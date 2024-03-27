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
    imgUrl,
  }: CreateEducatorDTO): Promise<Educator> {
    const educator = await prisma.educator.create({
      data: {
        name,
        description,
        authorId,
        imgUrl,
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

  async findEducatorByNameAutocomplete(
    educatorName: string
  ): Promise<Educator[] | null> {
    const educator = await prisma.educator.findMany({
      where: {
        name: {
          contains: educatorName,
        },
      },
    });

    return educator;
  }

  async findEducatorById(id: string): Promise<Educator | null> {
    const educator = await prisma.educator.findUnique({
      where: {
        id,
      },
    });

    return educator;
  }
}
