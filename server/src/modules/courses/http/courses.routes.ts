import { Router } from "express";
import { listCoursesController } from "../useCases/listCourses";
import { createCourseController } from "../useCases/createCourse";
import { findCourseByEducatorController } from "../useCases/findCourseByEducator";
import { Joi, Segments, celebrate } from "celebrate";

const courseRouter = Router();

courseRouter.get("/", (req, res) => {
  return listCoursesController.handle(req, res);
});

courseRouter.post("/", (req, res) => {
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

export { courseRouter };
