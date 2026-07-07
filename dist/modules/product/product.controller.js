"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductController = void 0;
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const product_service_1 = require("./product.service");
const createProduct = (0, catchAsync_1.default)(async (req, res) => {
    const payload = req.body;
    console.log(req.file);
    if (req.file) {
        payload.productImage = req.file.path;
    }
    const result = await product_service_1.ProductServices.createProduct(payload);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 201,
        message: "Product Created Successfully",
        data: result,
    });
});
const getAllProducts = (0, catchAsync_1.default)(async (req, res) => {
    const result = await product_service_1.ProductServices.getAllProducts(req.query);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        message: "Products Retrieved Successfully",
        data: result,
    });
});
const getSingleProduct = (0, catchAsync_1.default)(async (req, res) => {
    const { id } = req.params;
    const result = await product_service_1.ProductServices.getSingleProduct(id);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        message: "Product Retrieved Successfully",
        data: result,
    });
});
const updateProduct = (0, catchAsync_1.default)(async (req, res) => {
    const result = await product_service_1.ProductServices.updateProduct(req.params.id, req.body);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        message: "Product Updated Successfully",
        data: result,
    });
});
const deleteProduct = (0, catchAsync_1.default)(async (req, res) => {
    const { id } = req.params;
    const result = await product_service_1.ProductServices.deleteProduct(id);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        message: "Product Deleted Successfully",
        data: result,
    });
});
exports.ProductController = {
    createProduct,
    getAllProducts,
    getSingleProduct,
    updateProduct,
    deleteProduct,
};
//# sourceMappingURL=product.controller.js.map