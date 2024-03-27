import { Request, Response } from "express";
import { CreateCourseUseCase } from "./CreateCourseUseCase";

export class CreateCourseController {
  constructor(private createCourseUseCase: CreateCourseUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { title, description, price, educatorName, topicName, tags } =
      request.body;

    const course = await this.createCourseUseCase.execute({
      title,
      description,
      price,
      educatorName,
      topicName,
      tags,
    });

    return response.status(201).json(course);
  }
}
