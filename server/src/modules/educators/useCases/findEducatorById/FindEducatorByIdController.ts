import { Request, Response } from "express";
import { FindEducatorByIdUseCase } from "./FindEducatorByIdUseCase";

export class FindEducatorByIdController {
  constructor(private findEducatorByIdUseCase: FindEducatorByIdUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { educatorId } = request.params;

    const educator = await this.findEducatorByIdUseCase.execute(educatorId);

    return response.status(200).json(educator);
  }
}
