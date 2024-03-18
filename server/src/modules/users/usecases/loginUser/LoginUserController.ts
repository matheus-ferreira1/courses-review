import { Request, Response } from "express";

import { LoginUserUseCase } from "./LoginUserUseCase";

export class LoginUserController {
  constructor(private loginUserUseCase: LoginUserUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const { user, token } = await this.loginUserUseCase.execute({
      email,
      password,
    });

    const responseUser = {
      id: user.id,
      name: user.name,
      email: user.email,
    };

    return response.status(201).json({ responseUser, token });
  }
}
