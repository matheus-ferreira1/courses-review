import { Educator } from "@prisma/client";

import { EducatorRepository } from "../../repository/EducatorRepository";
import { AppError } from "../../../../shared/errors/AppError";
import { UserRepository } from "../../../users/repository/UserRepository";

type createEducatorDTO = {
  name: string;
  description: string;
  authorId: string;
};

export class CreateEducatorUseCase {
  constructor(
    private educatorRepository: EducatorRepository,
    private userRepository: UserRepository
  ) {}

  async execute({
    authorId,
    description,
    name,
  }: createEducatorDTO): Promise<Educator> {
    const user = await this.userRepository.findUserById(authorId);
    if (!user) {
      throw new AppError("User not found", 404);
    }

    const educatorAlreadyExists =
      await this.educatorRepository.findEducatorByName(name);

    if (educatorAlreadyExists) {
      throw new AppError("Educator already exists");
    }

    const educator = await this.educatorRepository.createEducator({
      authorId,
      description,
      name,
    });

    return educator;
  }
}
