import { Request, Response } from "express";
import { ListFeaturedTopicsUseCase } from "./ListFeaturedTopicsUseCase";

export class ListFeaturedTopicsController {
  constructor(private listFeaturedTopicsUseCase: ListFeaturedTopicsUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const topics = await this.listFeaturedTopicsUseCase.execute();

    return response.status(200).json(topics);
  }
}
