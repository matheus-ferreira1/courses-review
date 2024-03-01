import { Router } from "express";
import { Joi, Segments, celebrate } from "celebrate";

import { isAuthenticated } from "../../../shared/http/middlewares/isAuthenticated";
import { listTopicsController } from "../useCases/listTopics";
import { createTopicController } from "../useCases/createTopic";

const topicRouter = Router();

topicRouter.get("/", (req, res) => {
  return listTopicsController.handle(req, res);
});

topicRouter.post(
  "/",
  isAuthenticated,
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
    },
  }),
  (req, res) => {
    return createTopicController.handle(req, res);
  }
);

export { topicRouter };
