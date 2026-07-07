"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const auth_service_1 = require("./auth.service");
const login = async (req, res) => {
    try {
        const result = await auth_service_1.AuthService.login(req.body);
        res.status(200).json({
            success: true,
            message: "Login Successful",
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
exports.AuthController = {
    login,
};
//# sourceMappingURL=auth.controller.js.map