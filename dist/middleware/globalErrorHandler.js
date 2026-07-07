"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const globalErrorHandler = (err, req, res, next) => {
    console.error(err);
    res.status(500).json({
        success: false,
        message: err.message,
        stack: err.stack,
        error: err,
    });
};
exports.default = globalErrorHandler;
//# sourceMappingURL=globalErrorHandler.js.map