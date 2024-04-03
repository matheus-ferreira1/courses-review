import { Router } from "express";
import { Joi, Segments, celebrate } from "celebrate";

import { listCoursesController } from "../useCases/listCourses";
import { createCourseController } from "../useCases/createCourse";
import { findCourseByEducatorController } from "../useCases/findCourseByEducator";
import { findCourseByTopicController } from "../useCases/findCourseByTopic";
import { findCourseByIdController } from "../useCases/findCourseById";
import { isAuthenticated } from "../../../shared/http/middlewares/isAuthenticated";

const courseRouter = Router();

courseRouter.get("/", (req, res) => {
  return listCoursesController.handle(req, res);
});

courseRouter.post("/", isAuthenticated, (req, res) => {
  return createCourseController.handle(req, res);
});

courseRouter.get(
  "/:educatorId",
  celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      educatorId: Joi.string().uuid().required(),
    }),
  }),
  (req, res) => {
    return findCourseByEducatorController.handle(req, res);
  }
);

courseRouter.get(
  "/by-id/:courseId",
  celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      courseId: Joi.string().uuid().required(),
    }),
  }),
  (req, res) => {
    return findCourseByIdController.handle(req, res);
  }
);

courseRouter.get(
  "/by-topic/:topicId",
  celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      topicId: Joi.string().uuid().required(),
    }),
  }),
  (req, res) => {
    return findCourseByTopicController.handle(req, res);
  }
);

export { courseRouter };
