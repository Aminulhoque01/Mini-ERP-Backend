import { Request, Response } from "express";
import { AuthService } from "./auth.service";

const login = async (req: Request, res: Response) => {
  try {
    const result = await AuthService.login(req.body);

    res.status(200).json({
      success: true,
      message: "Login Successful",
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const AuthController = {
  login,
};