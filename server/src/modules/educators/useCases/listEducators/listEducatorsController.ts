import { Request, Response } from "express";
import { ListEducatorsUseCase } from "./listEducatorsUseCase";

export class ListEducatorsController {
  constructor(private listEducatorsUseCase: ListEducatorsUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const educators = await this.listEducatorsUseCase.execute();

    return response.status(200).json(educators);
  }
}
