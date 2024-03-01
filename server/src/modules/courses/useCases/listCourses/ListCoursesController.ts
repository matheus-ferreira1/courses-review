import { Request, Response } from "express";
import { ListCoursesUseCase } from "./ListCoursesUseCase";

export class ListCoursesController {
  constructor(private listCoursesUseCase: ListCoursesUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const courses = await this.listCoursesUseCase.execute();

    return response.status(200).json(courses);
  }
}
