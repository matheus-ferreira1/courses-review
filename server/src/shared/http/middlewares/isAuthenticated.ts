import { NextFunction, Request, Response } from "express";
import {
  JsonWebTokenError,
  Secret,
  TokenExpiredError,
  verify,
} from "jsonwebtoken";

import authConfig from "../../../config/auth";
import { AppError } from "../../errors/AppError";

type JwtPayloadProps = {
  sub: string;
};

export const isAuthenticated = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const token = request.cookies["auth-token"];

  if (!token) {
    throw new AppError("Failed to verify access token teste", 401);
  }

  try {
    const decodedToken = verify(token, authConfig.jwt.secret as Secret);
    const { sub } = decodedToken as JwtPayloadProps;
    request.user = {
      id: sub,
    };

    return next();
  } catch (err) {
    if (err instanceof TokenExpiredError) {
      throw new AppError("Access token expired", 401);
    }
    if (err instanceof JsonWebTokenError) {
      throw new AppError("Invalid access token", 401);
    }

    throw new AppError("Failed to verify access token", 401);
  }
};
