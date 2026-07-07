"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = void 0;
const jwt_1 = require("../utils/jwt");
const auth = () => {
    return (req, res, next) => {
        try {
            const bearerToken = req.headers.authorization;
            if (!bearerToken) {
                throw new Error("Unauthorized");
            }
            const token = bearerToken.split(" ")[1];
            const decoded = (0, jwt_1.verifyToken)(token);
            req.user = decoded;
            next();
        }
        catch (error) {
            res.status(401).json({
                success: false,
                message: "Unauthorized",
            });
        }
    };
};
exports.auth = auth;
//# sourceMappingURL=auth.js.map