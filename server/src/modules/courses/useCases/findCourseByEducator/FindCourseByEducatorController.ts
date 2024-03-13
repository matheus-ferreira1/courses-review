import { Request, Response } from "express";
import { FindCourseByEducatorUseCase } from "./FindCourseByEducatorUseCase";

export class FindCourseByEducatorController {
  constructor(
    private findCourseByEducatorUseCase: FindCourseByEducatorUseCase
  ) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { educatorId } = request.params;

    const courses = await this.findCourseByEducatorUseCase.execute(educatorId);

    return response.status(200).json(courses);
  }
}
