import { Request, Response } from "express";
import { FindCourseByTopicUseCase } from "./FindCourseByTopicUseCase";

export class FindCourseByTopicController {
  constructor(private findCourseByTopicUseCase: FindCourseByTopicUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { topicId } = request.params;

    const courses = await this.findCourseByTopicUseCase.execute(topicId);

    return response.status(200).json(courses);
  }
}
