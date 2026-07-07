"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const sales_controller_1 = require("./sales.controller");
const auth_1 = require("../../middleware/auth");
const role_1 = require("../../middleware/role");
const SaleRouter = (0, express_1.Router)();
SaleRouter.post("/", (0, auth_1.auth)(), (0, role_1.authorize)("admin", "manager", "employee"), sales_controller_1.SalesController.createSale);
SaleRouter.get("/", (0, auth_1.auth)(), (0, role_1.authorize)("admin", "manager"), sales_controller_1.SalesController.getAllSales);
SaleRouter.get("/:id", (0, auth_1.auth)(), (0, role_1.authorize)("admin", "manager"), sales_controller_1.SalesController.getSingleSale);
exports.default = SaleRouter;
//# sourceMappingURL=sales.route.js.map