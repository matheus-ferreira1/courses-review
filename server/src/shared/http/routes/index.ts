import { Router } from "express";

import { userRouter } from "../../../modules/users/http/users.routes";
import { educatorRouter } from "../../../modules/educators/http/educators.routes";
import { courseRouter } from "../../../modules/courses/http/courses.routes";
import { topicRouter } from "../../../modules/topics/http/topics.routes";

const routes = Router();

routes.get("/", (request, response) => {
  return response.json({ message: "Hello World" });
});

routes.use("/users", userRouter);
routes.use("/educators", educatorRouter);
routes.use("/courses", courseRouter);
routes.use("/topics", topicRouter);

export { routes };
