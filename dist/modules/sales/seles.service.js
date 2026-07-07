"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SalesService = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../utils/ApiError"));
const sales_model_1 = __importDefault(require("./sales.model"));
const product_model_1 = __importDefault(require("../product/product.model"));
const createSale = async (payload, userId) => {
    const session = await mongoose_1.default.startSession();
    try {
        session.startTransaction();
        // Generate Invoice Number
        const totalSales = await sales_model_1.default.countDocuments();
        const invoiceNo = `INV-${String(totalSales + 1).padStart(6, "0")}`;
        let grandTotal = 0;
        const saleProducts = [];
        for (const item of payload.products) {
            const product = await product_model_1.default.findById(item.product).session(session);
            if (!product) {
                throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Product not found");
            }
            if (product.isDeleted) {
                throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "Product deleted");
            }
            if (product.stockQuantity < item.quantity) {
                throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, `${product.productName} stock is insufficient`);
            }
            // Reduce Stock
            product.stockQuantity -= item.quantity;
            await product.save({ session });
            // Calculate
            const subTotal = product.sellingPrice * item.quantity;
            grandTotal += subTotal;
            saleProducts.push({
                product: product._id,
                quantity: item.quantity,
                price: product.sellingPrice,
                subTotal,
            });
        }
        const sale = await sales_model_1.default.create([
            {
                invoiceNo,
                products: saleProducts,
                grandTotal,
                soldBy: userId,
            },
        ], { session });
        await session.commitTransaction();
        session.endSession();
        return sale[0];
    }
    catch (error) {
        await session.abortTransaction();
        session.endSession();
        throw error;
    }
};
const getAllSales = async (query) => {
    const page = Number(query.page) || 1;
    const limit = Number(query.limit) || 10;
    const skip = (page - 1) * limit;
    const data = await sales_model_1.default.find()
        .populate("soldBy", "name email role")
        .populate("products.product", "productName sku sellingPrice")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit);
    const total = await sales_model_1.default.countDocuments();
    return {
        meta: {
            page,
            limit,
            total,
            totalPage: Math.ceil(total / limit),
        },
        data,
    };
};
const getSingleSale = async (id) => {
    const sale = await sales_model_1.default.findById(id)
        .populate("soldBy")
        .populate("products.product");
    if (!sale) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Sale not found");
    }
    return sale;
};
exports.SalesService = {
    createSale,
    getAllSales,
    getSingleSale
};
//# sourceMappingURL=seles.service.js.map