import { Request, Response, Router } from "express";
import { Joi, Segments, celebrate } from "celebrate";

import { registerUserController } from "../usecases/registerUser/index";

const userRouter = Router();

userRouter.post(
  "/register",
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  }),
  (req: Request, res: Response) => {
    return registerUserController.handle(req, res);
  }
);

export { userRouter };
