import { AppError } from "../../../../shared/errors/AppError";
import { EducatorRepository } from "../../repository/EducatorRepository";

export class FindEducatorByNameUseCase {
  constructor(private educatorRepository: EducatorRepository) {}

  async execute(educatorName: string) {
    const educator =
      await this.educatorRepository.findEducatorByNameAutocomplete(
        educatorName
      );

    if (!educator) {
      throw new AppError("Educator not found", 404);
    }

    return educator;
  }
}
