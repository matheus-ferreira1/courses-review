import { Request, Response } from "express";
import { ListFeaturedEducatorsUseCase } from "./listFeaturedEducatorsUseCase";

export class ListFeaturedEducatorsController {
  constructor(
    private listFeaturedEducatorsUseCase: ListFeaturedEducatorsUseCase
  ) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const educators = await this.listFeaturedEducatorsUseCase.execute();

    return response.status(200).json(educators);
  }
}
