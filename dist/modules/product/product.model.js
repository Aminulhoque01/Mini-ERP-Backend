"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const productSchema = new mongoose_1.Schema({
    productName: {
        type: String,
        required: true,
        trim: true,
    },
    sku: {
        type: String,
        required: true,
        unique: true,
        uppercase: true,
    },
    category: {
        type: String,
        required: true,
    },
    purchasePrice: {
        type: Number,
        required: true,
        min: 0,
    },
    sellingPrice: {
        type: Number,
        required: true,
        min: 0,
    },
    stockQuantity: {
        type: Number,
        required: true,
        default: 0,
    },
    productImage: {
        type: String,
        required: true,
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },
}, {
    timestamps: true,
});
productSchema.statics.isProductExists = async function (sku) {
    return await this.findOne({
        sku,
        isDeleted: false,
    });
};
const Product = (0, mongoose_1.model)("Product", productSchema);
exports.default = Product;
//# sourceMappingURL=product.model.js.map