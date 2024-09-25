import { EducatorRepository } from "../../repository/EducatorRepository";
import { FeaturedEducatorsDTO } from "../../repository/IEducatorRepository";

export class ListFeaturedEducatorsUseCase {
  constructor(private educatorRepository: EducatorRepository) {}

  async execute(): Promise<FeaturedEducatorsDTO[]> {
    const featuredEducators =
      await this.educatorRepository.listFeaturedEducators();

    return featuredEducators;
  }
}
