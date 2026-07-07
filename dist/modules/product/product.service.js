"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductServices = void 0;
const QueryBuilder_1 = __importDefault(require("../../builder/QueryBuilder"));
const product_model_1 = __importDefault(require("./product.model"));
const searchableFields = [
    "productName",
    "sku",
    "category",
];
const createProduct = async (payload) => {
    const exists = await product_model_1.default.isProductExists(payload.sku);
    if (exists) {
        throw new Error("SKU already exists");
    }
    const result = await product_model_1.default.create(payload);
    return result;
};
const getAllProducts = async (query) => {
    const productQuery = new QueryBuilder_1.default(product_model_1.default.find({
        isDeleted: false,
    }), query)
        .search(searchableFields)
        .filter()
        .sort()
        .paginate();
    const result = await productQuery.modelQuery;
    const meta = await productQuery.countTotal();
    return {
        meta,
        result,
    };
};
const getSingleProduct = async (id) => {
    return await product_model_1.default.findOne({
        _id: id,
        isDeleted: false,
    });
};
const updateProduct = async (id, payload) => {
    return await product_model_1.default.findByIdAndUpdate(id, payload, {
        returnDocument: "after",
        runValidators: true,
    });
};
const deleteProduct = async (id) => {
    return await product_model_1.default.findByIdAndUpdate(id, {
        isDeleted: true,
    }, {
        new: true,
    });
};
exports.ProductServices = {
    createProduct,
    getAllProducts,
    getSingleProduct,
    updateProduct,
    deleteProduct,
};
//# sourceMappingURL=product.service.js.map