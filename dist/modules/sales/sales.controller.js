"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SalesController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const seles_service_1 = require("./seles.service");
const createSale = (0, catchAsync_1.default)(async (req, res) => {
    const userId = req.user.id;
    const result = await seles_service_1.SalesService.createSale(req.body, userId);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.CREATED,
        success: true,
        message: "Sale created successfully",
        data: result,
    });
});
const getAllSales = (0, catchAsync_1.default)(async (req, res) => {
    const result = await seles_service_1.SalesService.getAllSales(req.query);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Sales retrieved successfully",
        data: result,
    });
});
const getSingleSale = (0, catchAsync_1.default)(async (req, res) => {
    const { id } = req.params;
    const result = await seles_service_1.SalesService.getSingleSale(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Sale retrieved successfully",
        data: result,
    });
});
exports.SalesController = {
    createSale,
    getAllSales,
    getSingleSale,
};
//# sourceMappingURL=sales.controller.js.map