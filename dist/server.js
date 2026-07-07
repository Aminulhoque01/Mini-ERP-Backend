"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const user_route_1 = __importDefault(require("./modules/user/user.route"));
const auth_route_1 = __importDefault(require("./modules/auth/auth.route"));
const globalErrorHandler_1 = __importDefault(require("./middleware/globalErrorHandler"));
const product_route_1 = __importDefault(require("./modules/product/product.route"));
const sales_route_1 = __importDefault(require("./modules/sales/sales.route"));
const dashboard_route_1 = __importDefault(require("./modules/dashboard/dashboard.route"));
// Error Handler
dotenv_1.default.config();
const app = (0, express_1.default)();
// Middlewares
// =======================
app.use((0, cors_1.default)());
app.use((0, helmet_1.default)({
    crossOriginResourcePolicy: false,
}));
app.use((0, morgan_1.default)("dev"));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// Health Check
// =======================
app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "ERP Backend API Running Successfully 🚀",
    });
});
// API Routes
// =======================
app.use("/api/users", user_route_1.default);
app.use("/api/auth", auth_route_1.default);
app.use("/api/products", product_route_1.default);
app.use("/api/sales", sales_route_1.default);
app.use("/api/dashboard", dashboard_route_1.default);
// 404 Route
// =======================
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "Route Not Found",
    });
});
// =======================
// Global Error Handler
// =======================
// app.use(errorHandler);
app.use(globalErrorHandler_1.default);
// =======================
// Database Connection
// =======================
const PORT = process.env.PORT || 5000;
const startServer = async () => {
    try {
        await mongoose_1.default.connect(process.env.MONGO_URI);
        console.log("✅ MongoDB Connected Successfully");
        app.listen(PORT, () => {
            console.log(`🚀 Server is running on http://localhost:${PORT}`);
        });
    }
    catch (error) {
        console.error("❌ Failed to connect MongoDB");
        console.error(error);
    }
};
startServer();
//# sourceMappingURL=server.js.map