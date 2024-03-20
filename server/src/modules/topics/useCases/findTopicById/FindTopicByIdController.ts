import { Request, Response } from "express";
import { FindTopicByIdUseCase } from "./FindTopicByIdUseCase";

export class FindTopicByIdController {
  constructor(private findTopicByIdUseCase: FindTopicByIdUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { topicId } = request.params;

    const topic = await this.findTopicByIdUseCase.execute(topicId);

    return response.status(200).json(topic);
  }
}
