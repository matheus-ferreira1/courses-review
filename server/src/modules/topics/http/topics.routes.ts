import { Router } from "express";
import { Joi, Segments, celebrate } from "celebrate";

import { isAuthenticated } from "../../../shared/http/middlewares/isAuthenticated";
import { listTopicsController } from "../useCases/listTopics";
import { createTopicController } from "../useCases/createTopic";
import { findTopicByIdController } from "../useCases/findTopicById";

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

topicRouter.get(
  "/:topicId",
  celebrate({
    [Segments.PARAMS]: {
      topicId: Joi.string().uuid().required(),
    },
  }),
  (req, res) => {
    return findTopicByIdController.handle(req, res);
  }
);

export { topicRouter };
