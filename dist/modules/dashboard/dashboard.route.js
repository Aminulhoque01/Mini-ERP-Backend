"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const dashboard_controller_1 = require("./dashboard.controller");
const role_1 = require("../../middleware/role");
const auth_1 = require("../../middleware/auth");
const DashboardRoutes = (0, express_1.Router)();
DashboardRoutes.get("/", (0, auth_1.auth)(), (0, role_1.authorize)("admin", "manager"), dashboard_controller_1.DashboardController.getDashboard);
exports.default = DashboardRoutes;
//# sourceMappingURL=dashboard.route.js.map