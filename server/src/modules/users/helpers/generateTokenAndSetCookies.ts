import { Response } from "express";
import { sign } from "jsonwebtoken";

import jwtConfig from "../../../config/auth";

export const generateTokenAndSetCookies = (userId: number, res: Response) => {
  const token = sign({ userId }, jwtConfig.jwt.secret, {
    expiresIn: jwtConfig.jwt.expiresIn,
    subject: userId.toString(),
  });

  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "none",
  });

  return token;
};
