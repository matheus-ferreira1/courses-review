import { Router } from "express";

import { userRouter } from "../../../modules/users/http/users.routes";

const routes = Router();

routes.get("/", (request, response) => {
  return response.json({ message: "Hello World" });
});
routes.use("/users", userRouter);

export { routes };
