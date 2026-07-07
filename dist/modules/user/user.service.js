"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const user_model_1 = __importDefault(require("./user.model"));
const createUser = async (payload) => {
    const isExist = await user_model_1.default.findOne({
        email: payload.email,
    });
    if (isExist) {
        throw new Error("Email already exists");
    }
    const result = await user_model_1.default.create(payload);
    return result;
};
const getUsers = async () => {
    return await user_model_1.default.find({
        isDeleted: false,
    }).select("-password");
};
const getSingleUser = async (id) => {
    return await user_model_1.default.findById(id).select("-password");
};
const updateUser = async (id, payload) => {
    return await user_model_1.default.findByIdAndUpdate(id, payload, {
        new: true,
    }).select("-password");
};
const deleteUser = async (id) => {
    return await user_model_1.default.findByIdAndUpdate(id, {
        isDeleted: true,
    }, {
        new: true,
    });
};
exports.UserService = {
    createUser,
    getUsers,
    getSingleUser,
    updateUser,
    deleteUser,
};
//# sourceMappingURL=user.service.js.map