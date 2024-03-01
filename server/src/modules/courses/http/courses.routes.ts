import { Router } from "express";
import { listCoursesController } from "../useCases/listCourses";

const courseRouter = Router();

courseRouter.get("/", (req, res) => {
  return listCoursesController.handle(req, res);
});

export { courseRouter };
