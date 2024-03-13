import { Request, Response, Router } from "express";
import { Joi, Segments, celebrate } from "celebrate";

import { isAuthenticated } from "../../../shared/http/middlewares/isAuthenticated";

import { listEducatorsController } from "../useCases/listEducators";
import { createEducatorController } from "../useCases/createEducator";
import { findEducatorByIdController } from "../useCases/findEducatorById";

const educatorRouter = Router();

educatorRouter.get("/", (req, res) => {
  return listEducatorsController.handle(req, res);
});

educatorRouter.get(
  "/:educatorId",
  celebrate({
    [Segments.PARAMS]: {
      educatorId: Joi.string().uuid().required(),
    },
  }),
  (req, res) => {
    return findEducatorByIdController.handle(req, res);
  }
);

educatorRouter.post(
  "/",
  isAuthenticated,
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      description: Joi.string().required(),
      authorId: Joi.string().required(),
    },
  }),
  (req: Request, res: Response) => {
    return createEducatorController.handle(req, res);
  }
);

export { educatorRouter };
