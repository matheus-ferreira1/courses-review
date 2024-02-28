import { Router } from "express";

import { userRouter } from "../../../modules/users/http/users.routes";
import { educatorRouter } from "../../../modules/educators/http/educators.routes";

const routes = Router();

routes.get("/", (request, response) => {
  return response.json({ message: "Hello World" });
});

routes.use("/users", userRouter);
routes.use("/educators", educatorRouter);

export { routes };
