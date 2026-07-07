"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSaleValidation = void 0;
const zod_1 = require("zod");
exports.createSaleValidation = zod_1.z.object({
    body: zod_1.z.object({
        customer: zod_1.z.string().optional(),
        products: zod_1.z.array(zod_1.z.object({
            product: zod_1.z.string(),
            quantity: zod_1.z.number().min(1),
        })),
        discount: zod_1.z.number().optional(),
        vat: zod_1.z.number().optional(),
        paidAmount: zod_1.z.number().optional(),
        paymentMethod: zod_1.z.enum([
            "Cash",
            "Bkash",
            "Nagad",
            "Card",
            "Bank",
        ]),
        note: zod_1.z.string().optional(),
    }),
});
//# sourceMappingURL=sales.validation.js.map