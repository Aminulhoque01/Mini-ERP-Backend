"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardController = void 0;
const dashboard_service_1 = require("./dashboard.service");
const getDashboard = async (req, res) => {
    try {
        console.log("Dashboard API Hit");
        const result = await dashboard_service_1.DashboardService.getDashboard();
        console.log(result);
        res.status(200).json({
            success: true,
            message: "Dashboard data retrieved successfully",
            data: result,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
exports.DashboardController = {
    getDashboard,
};
//# sourceMappingURL=dashboard.controller.js.map