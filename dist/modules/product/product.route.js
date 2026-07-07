"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const product_controller_1 = require("./product.controller");
const auth_1 = require("../../middleware/auth");
const role_1 = require("../../middleware/role");
const upload_1 = require("../../middleware/upload");
const ProductRoutes = (0, express_1.Router)();
ProductRoutes.post("/create", (0, auth_1.auth)(), (0, role_1.authorize)("admin", "manager"), upload_1.upload.single("image"), product_controller_1.ProductController.createProduct);
ProductRoutes.get("/", product_controller_1.ProductController.getAllProducts);
ProductRoutes.get("/:id", product_controller_1.ProductController.getSingleProduct);
ProductRoutes.patch("/:id", (0, auth_1.auth)(), (0, role_1.authorize)("admin", "manager"), product_controller_1.ProductController.updateProduct);
ProductRoutes.delete("/:id", (0, auth_1.auth)(), (0, role_1.authorize)("admin", "manager"), product_controller_1.ProductController.deleteProduct);
exports.default = ProductRoutes;
//# sourceMappingURL=product.route.js.map