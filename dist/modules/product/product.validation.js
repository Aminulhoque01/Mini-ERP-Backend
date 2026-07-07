"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProductValidation = exports.createProductValidation = void 0;
const zod_1 = require("zod");
exports.createProductValidation = zod_1.z.object({
    body: zod_1.z.object({
        productName: zod_1.z.string(),
        sku: zod_1.z.string(),
        category: zod_1.z.string(),
        purchasePrice: zod_1.z.number(),
        sellingPrice: zod_1.z.number(),
        stockQuantity: zod_1.z.number(),
        productImage: zod_1.z.string(),
    }),
});
exports.updateProductValidation = zod_1.z.object({
    body: zod_1.z.object({
        productName: zod_1.z.string().optional(),
        sku: zod_1.z.string().optional(),
        category: zod_1.z.string().optional(),
        purchasePrice: zod_1.z.number().optional(),
        sellingPrice: zod_1.z.number().optional(),
        stockQuantity: zod_1.z.number().optional(),
        productImage: zod_1.z.string().optional(),
    }),
});
//# sourceMappingURL=product.validation.js.map