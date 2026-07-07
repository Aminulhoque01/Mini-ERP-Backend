import { Request, Response } from "express";
import { DashboardService } from "./dashboard.service";

const getDashboard = async (
  req: Request,
  res: Response
) => {
  try {
    console.log("Dashboard API Hit");
    const result =
      await DashboardService.getDashboard();
       console.log(result);

    res.status(200).json({
      success: true,
      message: "Dashboard data retrieved successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const DashboardController = {
  getDashboard,
};