"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const saleSchema = new mongoose_1.Schema({
    invoiceNo: {
        type: String,
        required: true,
        unique: true,
    },
    products: [
        {
            product: {
                type: mongoose_1.Schema.Types.ObjectId,
                ref: "Product",
                required: true,
            },
            quantity: {
                type: Number,
                required: true,
                min: 1,
            },
            price: {
                type: Number,
                required: true,
            },
            subTotal: {
                type: Number,
                required: true,
            },
        },
    ],
    grandTotal: {
        type: Number,
        required: true,
    },
    soldBy: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
}, {
    timestamps: true,
});
const Sale = (0, mongoose_1.model)("Sale", saleSchema);
exports.default = Sale;
//# sourceMappingURL=sales.model.js.map