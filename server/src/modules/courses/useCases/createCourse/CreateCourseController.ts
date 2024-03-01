import { Request, Response } from "express";
import { CreateCourseUseCase } from "./CreateCourseUseCase";

export class CreateCourseController {
  constructor(private createCourseUseCase: CreateCourseUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { title, description, price, educatorId, topicId, tags } =
      request.body;

    const course = await this.createCourseUseCase.execute({
      title,
      description,
      price,
      educatorId,
      topicId,
      tags,
    });

    return response.status(201).json(course);
  }
}
