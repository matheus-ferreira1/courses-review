import { Request, Response } from "express";
import { CreateTopicUseCase } from "./CreateTopicUseCase";

export class CreateTopicController {
  constructor(private createTopicUseCase: CreateTopicUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { name } = request.body;

    const topic = await this.createTopicUseCase.execute({
      name,
    });

    return response.status(201).json(topic);
  }
}
