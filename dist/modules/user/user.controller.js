"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const user_service_1 = require("./user.service");
const createUser = async (req, res) => {
    try {
        const result = await user_service_1.UserService.createUser(req.body);
        res.status(201).json({
            success: true,
            message: "User Created Successfully",
            data: result,
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};
const getUsers = async (req, res) => {
    const result = await user_service_1.UserService.getUsers();
    res.json({
        success: true,
        data: result,
    });
};
const getSingleUser = async (req, res) => {
    const result = await user_service_1.UserService.getSingleUser(req.params.id);
    res.json({
        success: true,
        data: result,
    });
};
const updateUser = async (req, res) => {
    const result = await user_service_1.UserService.updateUser(req.params.id, req.body);
    res.json({
        success: true,
        message: "Updated Successfully",
        data: result,
    });
};
const deleteUser = async (req, res) => {
    await user_service_1.UserService.deleteUser(req.params.id);
    res.json({
        success: true,
        message: "Deleted Successfully",
    });
};
exports.UserController = {
    createUser,
    getUsers,
    getSingleUser,
    updateUser,
    deleteUser,
};
//# sourceMappingURL=user.controller.js.map