import { Request, Response } from "express";
import { CreateEducatorUseCase } from "./createEducatorUseCase";

export class CreateEducatorController {
  constructor(private createEducatorUseCase: CreateEducatorUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { name, description, authorId, imgUrl } = request.body;

    const educator = await this.createEducatorUseCase.execute({
      name,
      description,
      authorId,
      imgUrl,
    });

    return response.status(201).json(educator);
  }
}
