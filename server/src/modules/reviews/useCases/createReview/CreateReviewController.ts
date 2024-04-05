import { Request, Response } from "express";
import { CreateReviewUseCase } from "./CreateReviewUseCase";

export class CreateReviewController {
  constructor(private createReviewUseCase: CreateReviewUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { rating, description } = request.body;
    const { courseId } = request.params;
    const userId = request.user.id;

    const review = await this.createReviewUseCase.execute({
      courseId,
      userId,
      rating,
      description,
    });

    return response.status(201).json(review);
  }
}
