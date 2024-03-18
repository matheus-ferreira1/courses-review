import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { errors } from "celebrate";
import "express-async-errors";
import "dotenv/config";

import { AppError } from "../errors/AppError";
import { routes } from "../http/routes";

const PORT = process.env.PORT || 3001;

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);
app.use(routes);
// o middleware do celebrate obrigatoriamente tem que vir depois do routes, senão dá erro e crasha a aplicação
app.use(errors());

app.use(
  (error: Error, request: Request, response: Response, next: NextFunction) => {
    if (error instanceof AppError) {
      return response.status(error.statusCode).json({
        status: "error",
        message: error.message,
      });
    }
    console.log(error);
    return response.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
);

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}!`);
});
