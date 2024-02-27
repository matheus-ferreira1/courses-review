import { Request, Response } from "express";

import { RegisterUserUseCase } from "./RegisterUserUseCase";

export class RegisterUserController {
  constructor(private registerUserUseCase: RegisterUserUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body;

    const user = await this.registerUserUseCase.execute({
      name,
      email,
      password,
    });

    return response
      .status(201)
      .json({ id: user.id, name: user.name, email: user.email });
  }
}
