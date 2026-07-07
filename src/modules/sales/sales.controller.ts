import { Request, Response } from "express";
import httpStatus from "http-status";

import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { SalesService } from "./seles.service";

 

const createSale = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user.id;

  const result = await SalesService.createSale(req.body, userId);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Sale created successfully",
    data: result,
  });
});

const getAllSales = catchAsync(async (req: Request, res: Response) => {
  const result = await SalesService.getAllSales(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Sales retrieved successfully",
    data: result,
  });
});

const getSingleSale = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
 
  const result = await SalesService.getSingleSale(id as string);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Sale retrieved successfully",
    data: result,
  });
});

export const SalesController = {
  createSale,
  getAllSales,
  getSingleSale,
};