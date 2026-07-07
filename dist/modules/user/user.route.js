"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("./user.controller");
const UserRouter = (0, express_1.Router)();
UserRouter.post("/create", user_controller_1.UserController.createUser);
UserRouter.get("/", user_controller_1.UserController.getUsers);
UserRouter.get("/:id", user_controller_1.UserController.getSingleUser);
UserRouter.patch("/:id", user_controller_1.UserController.updateUser);
UserRouter.delete("/:id", user_controller_1.UserController.deleteUser);
exports.default = UserRouter;
//# sourceMappingURL=user.route.js.map