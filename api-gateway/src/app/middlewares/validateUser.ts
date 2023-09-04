import axios from "axios";
import { Request, Response, NextFunction } from "express";

interface ITokenPayload {
  iat: number;
  ext: number;
  sub: string;
  id: string;
}

export default async function validateUser(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  const userId = request.body.user_id;

  if (!userId) {
    return response.status(401).json({ message: "Missing JWT token" });
  }

  try {
    const checkUserExists = await axios.get(`http://localhost:3334/auth/${userId}`);
    if(!checkUserExists.data._id) {
      return response.status(401).json({ message: "Invalid JWT token" });
    }
    return next();
  } catch (err) {
    return response.status(401).json({ message: "Invalid JWT token" });
  }
}