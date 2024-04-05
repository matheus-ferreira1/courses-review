import { Request, Response } from "express";
import { ListReviewsByCourseUseCase } from "./ListReviewsByCourseUseCase";

export class ListReviewsByCourseController {
  constructor(private listReviewsByCourseUseCase: ListReviewsByCourseUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { courseId } = request.params;

    const reviews = await this.listReviewsByCourseUseCase.execute(courseId);

    return response.json(reviews);
  }
}
