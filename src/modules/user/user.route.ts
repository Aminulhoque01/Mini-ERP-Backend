import { Router } from "express";
import { UserController } from "./user.controller";

const UserRouter = Router();

UserRouter.post("/create", UserController.createUser);

UserRouter.get("/", UserController.getUsers);

UserRouter.get("/:id", UserController.getSingleUser);

UserRouter.patch("/:id", UserController.updateUser);

UserRouter.delete("/:id", UserController.deleteUser);

export default UserRouter;