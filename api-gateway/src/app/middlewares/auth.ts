import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

import authConfig from "../../config/auth";

interface ITokenPayload {
  iat: number;
  ext: number;
  sub: string;
  id: string;
}

export default function auth(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    return response.status(401).json({ message: "Missing JWT token" });
  }

  const [, token] = authHeader.split(" ");

  try {
    const decoded = verify(token, authConfig.jwt.secret);
    const { id } = decoded as ITokenPayload;
    request.body.user_id = id;

    return next();
  } catch (err) {
    return response.status(401).json({ message: "Invalid JWT token" });
  }
}