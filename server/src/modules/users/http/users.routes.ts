import { Request, Response, Router } from "express";
import { Joi, Segments, celebrate } from "celebrate";

import { isAuthenticated } from "../../../shared/http/middlewares/isAuthenticated";

import { registerUserController } from "../useCases/registerUser/index";
import { loginUserController } from "../useCases/loginUser";
import { updateUserProfileController } from "../useCases/updateUserProfile";

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

userRouter.post(
  "/login",
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  }),
  (req: Request, res: Response) => {
    return loginUserController.handle(req, res);
  }
);

userRouter.post("/logout", (req: Request, res: Response) => {
  res.cookie("auth-token", "", { expires: new Date(0) });
  res.send();
});

userRouter.get(
  "/validate-token",
  isAuthenticated,
  (req: Request, res: Response) => {
    return res.send({ message: "Token is valid" });
  }
);

userRouter.put(
  "/profile/:id",
  isAuthenticated,
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      old_password: Joi.string().optional(),
      password: Joi.string().optional(),
      password_confirmation: Joi.string()
        .valid(Joi.ref("password"))
        .when("password", { is: Joi.exist(), then: Joi.required() }),
    },
  }),
  (req: Request, res: Response) => {
    return updateUserProfileController.handle(req, res);
  }
);

export { userRouter };
