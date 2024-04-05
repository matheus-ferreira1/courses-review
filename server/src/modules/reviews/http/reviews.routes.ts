import { Router } from "express";
import { Joi, Segments, celebrate } from "celebrate";

import { isAuthenticated } from "../../../shared/http/middlewares/isAuthenticated";

import { listReviewsByCourseController } from "../useCases/listReviewsByCourse";
import { createReviewController } from "../useCases/createReview";

const reviewRouter = Router();

reviewRouter.get("/", (req, res) => {
  return res.json({ message: "Hello from reviews!" });
});

reviewRouter.get(
  "/:courseId",
  celebrate({
    [Segments.PARAMS]: {
      courseId: Joi.string().uuid().required(),
    },
  }),
  (req, res) => {
    return listReviewsByCourseController.handle(req, res);
  }
);

reviewRouter.post(
  "/:courseId",
  isAuthenticated,
  celebrate({
    [Segments.BODY]: {
      rating: Joi.number().required(),
      description: Joi.string().required(),
    },
    [Segments.PARAMS]: {
      courseId: Joi.string().uuid().required(),
    },
  }),
  (req, res) => {
    return createReviewController.handle(req, res);
  }
);

export { reviewRouter };
