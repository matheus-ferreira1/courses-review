import { Request, Response } from "express";
import { FindCourseByIdUseCase } from "./FindCourseByIdUseCase";

export class FindCourseByIdController {
  constructor(private findCourseByIdUseCase: FindCourseByIdUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { courseId } = request.params;

    const course = await this.findCourseByIdUseCase.execute(courseId);

    return response.status(200).json(course);
  }
}
