"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_model_1 = __importDefault(require("../user/user.model"));
const jwt_1 = require("../../utils/jwt");
const login = async (payload) => {
    const user = await user_model_1.default.findOne({
        email: payload.email,
        isDeleted: false,
    }).select("+password");
    if (!user) {
        throw new Error("User not found");
    }
    const isPasswordMatched = await bcrypt_1.default.compare(payload.password, user.password);
    if (!isPasswordMatched) {
        throw new Error("Password is incorrect");
    }
    const accessToken = (0, jwt_1.createToken)({
        id: user._id,
        role: user.role,
        email: user.email,
    });
    const userData = {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        avatar: user.avatar,
    };
    return {
        accessToken,
        user: userData,
    };
};
exports.AuthService = {
    login,
};
//# sourceMappingURL=auth.service.js.map