import { NextFunction, Request, Response } from "express";
import { verifyToken } from "../utils/jwt";

export const auth = () => {

  return (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {

    try {

      const bearerToken = req.headers.authorization;

      if (!bearerToken) {
        throw new Error("Unauthorized");
      }

      const token = bearerToken.split(" ")[1];

      const decoded = verifyToken(token);

      req.user = decoded;

      next();

    } catch (error) {

      res.status(401).json({
        success: false,
        message: "Unauthorized",
      });

    }

  };

};