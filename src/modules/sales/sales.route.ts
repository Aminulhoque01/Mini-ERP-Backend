import { Router } from "express";

import { SalesController } from "./sales.controller";
import { auth } from "../../middleware/auth";
import { authorize } from "../../middleware/role";

const SaleRouter = Router();

SaleRouter.post(
  "/",
  auth(),
  authorize("admin", "manager", "employee"),
  SalesController.createSale
);

SaleRouter.get(
  "/",
  auth(),
  authorize("admin", "manager"),
  SalesController.getAllSales
);

SaleRouter.get(
  "/:id",
  auth(),
  authorize("admin", "manager"),
  SalesController.getSingleSale
);

export default SaleRouter;