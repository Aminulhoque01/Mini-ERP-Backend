import { Request, Response } from "express";
import { UserService } from "./user.service";

const createUser = async (req: Request, res: Response) => {
  try {
    const result = await UserService.createUser(req.body);

    res.status(201).json({
      success: true,
      message: "User Created Successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const getUsers = async (req: Request, res: Response) => {
  const result = await UserService.getUsers();

  res.json({
    success: true,
    data: result,
  });
};

const getSingleUser = async (req: Request, res: Response) => {
  const result = await UserService.getSingleUser(req.params.id as string);

  res.json({
    success: true,
    data: result,
  });
};

const updateUser = async (req: Request, res: Response) => {
  const result = await UserService.updateUser(
    req.params.id as string,
    req.body
  );

  res.json({
    success: true,
    message: "Updated Successfully",
    data: result,
  });
};

const deleteUser = async (req: Request, res: Response) => {
  await UserService.deleteUser(req.params.id as string);

  res.json({
    success: true,
    message: "Deleted Successfully",
  });
};

export const UserController = {
  createUser,
  getUsers,
  getSingleUser,
  updateUser,
  deleteUser,
};