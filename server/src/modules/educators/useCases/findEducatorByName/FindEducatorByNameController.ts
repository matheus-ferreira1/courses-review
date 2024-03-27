import { Request, Response } from "express";
import { FindEducatorByNameUseCase } from "./FindEducatorByNameUseCase";

export class FindEducatorByNameController {
  constructor(private findEducatorByNameUseCase: FindEducatorByNameUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { educatorName } = request.params;

    const educator = await this.findEducatorByNameUseCase.execute(educatorName);

    return response.status(200).json(educator);
  }
}
