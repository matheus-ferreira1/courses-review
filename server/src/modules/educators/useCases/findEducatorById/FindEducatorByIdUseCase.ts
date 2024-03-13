import { EducatorRepository } from "../../repository/EducatorRepository";

export class FindEducatorByIdUseCase {
  constructor(private educatorRepository: EducatorRepository) {}

  async execute(educatorId: string) {
    const educator = await this.educatorRepository.findEducatorById(educatorId);

    return educator;
  }
}
