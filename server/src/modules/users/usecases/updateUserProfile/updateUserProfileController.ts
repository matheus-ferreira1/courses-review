import { Request, Response } from "express";
import { UpdateUserProfileUseCase } from "./updateUserProfileUseCase";

export class UpdateUserProfileController {
  constructor(private updateUserProfileUseCase: UpdateUserProfileUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { name, email, password, old_password } = request.body;
    const userId = request.user.id;

    const user = await this.updateUserProfileUseCase.execute({
      id: userId,
      name,
      email,
      password,
      old_password,
    });

    const returnUser = {
      id: user.id,
      name: user.name,
      email: user.email,
    };

    return response.json(returnUser);
  }
}
