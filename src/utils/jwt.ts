import jwt from "jsonwebtoken";
import type { StringValue } from "ms";

export const createToken = (payload: object) => {
  return jwt.sign(payload, process.env.JWT_SECRET as string, {
    expiresIn: (process.env.JWT_EXPIRES_IN || "7d") as StringValue,
  });
};

export const verifyToken = (token: string) => {
  return jwt.verify(token, process.env.JWT_SECRET as string);
};