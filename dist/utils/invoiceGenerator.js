"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateInvoiceNumber = void 0;
const pad = (num) => {
    return num.toString().padStart(5, "0");
};
const generateInvoiceNumber = async (count) => {
    const today = new Date();
    const date = today.getFullYear().toString() +
        (today.getMonth() + 1)
            .toString()
            .padStart(2, "0") +
        today
            .getDate()
            .toString()
            .padStart(2, "0");
    return `INV-${date}-${pad(count + 1)}`;
};
exports.generateInvoiceNumber = generateInvoiceNumber;
//# sourceMappingURL=invoiceGenerator.js.map