import { Request, Response } from "express";
import { ListTopicsUseCase } from "./ListTopicsUseCase";

export class ListTopicsController {
  constructor(private listTopicsUseCase: ListTopicsUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const topics = await this.listTopicsUseCase.execute();

    return response.status(200).json(topics);
  }
}
