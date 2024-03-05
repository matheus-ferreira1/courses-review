import { Router } from "express";
import { listCoursesController } from "../useCases/listCourses";
import { createCourseController } from "../useCases/createCourse";

const courseRouter = Router();

courseRouter.get("/", (req, res) => {
  return listCoursesController.handle(req, res);
});

courseRouter.post("/", (req, res) => {
  return createCourseController.handle(req, res);
});

export { courseRouter };
