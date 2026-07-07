import { Router } from "express";
import { DashboardController } from "./dashboard.controller";
import { authorize } from "../../middleware/role";
import { auth } from "../../middleware/auth";
 

const DashboardRoutes = Router();

DashboardRoutes.get(
  "/",
  auth(),
    authorize("admin", "manager"),
  DashboardController.getDashboard
);

export default DashboardRoutes;