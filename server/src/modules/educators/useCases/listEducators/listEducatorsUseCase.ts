import { Educator } from "@prisma/client";
import { EducatorRepository } from "../../repository/EducatorRepository";

export class ListEducatorsUseCase {
  constructor(private educatorRepository: EducatorRepository) {}

  async execute(): Promise<Educator[]> {
    const educators = await this.educatorRepository.listEducators();

    return educators;
  }
}
