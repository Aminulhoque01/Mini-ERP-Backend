"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardService = void 0;
const product_model_1 = __importDefault(require("../product/product.model"));
const sales_model_1 = __importDefault(require("../sales/sales.model"));
const getDashboard = async () => {
    const totalProducts = await product_model_1.default.countDocuments({
        isDeleted: false,
    });
    const totalSales = await sales_model_1.default.countDocuments();
    const lowStockProducts = await product_model_1.default.find({
        stockQuantity: { $lt: 5 },
        isDeleted: false,
    })
        .select("productName sku stockQuantity productImage")
        .sort({ stockQuantity: 1 });
    const lowStock = lowStockProducts.length;
    const totalRevenue = await sales_model_1.default.aggregate([
        {
            $group: {
                _id: null,
                totalRevenue: {
                    $sum: "$grandTotal",
                },
            },
        },
    ]);
    return {
        totalProducts,
        totalSales,
        totalRevenue: totalRevenue.length > 0
            ? totalRevenue[0].totalRevenue
            : 0,
        lowStock,
        lowStockProducts,
    };
};
exports.DashboardService = {
    getDashboard,
};
//# sourceMappingURL=dashboard.service.js.map