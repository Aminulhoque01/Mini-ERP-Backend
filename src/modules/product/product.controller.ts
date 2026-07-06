import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { ProductServices } from "./product.service";

const createProduct = catchAsync(
  async (req: Request, res: Response) => {
    const payload = req.body;

    console.log(req.file);

    if (req.file) {
      payload.productImage = (req.file as any).path;
    }

    const result = await ProductServices.createProduct(payload);

    sendResponse(res, {
      success: true,
      statusCode: 201,
      message: "Product Created Successfully",
      data: result,
    });
  }
);

const getAllProducts = catchAsync(
  async (req: Request, res: Response) => {
    const result =
      await ProductServices.getAllProducts(req.query);

    sendResponse(res, {
      success: true,
      statusCode: 200,
      message: "Products Retrieved Successfully",
      data: result,
    });
  }
);

const getSingleProduct = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;

    const result =
      await ProductServices.getSingleProduct(id as string);

    sendResponse(res, {
      success: true,
      statusCode: 200,
      message: "Product Retrieved Successfully",
      data: result,
    });
  }
);

const updateProduct = catchAsync(
  async (req: Request, res: Response) => {
  
   

    const result = await ProductServices.updateProduct(
      req.params.id as string,
      req.body
    );

    

    sendResponse(res, {
      success: true,
      statusCode: 200,
      message: "Product Updated Successfully",
      data: result,
    });
  }
);

const deleteProduct = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;

    const result =
      await ProductServices.deleteProduct(id  as string);

    sendResponse(res, {
      success: true,
      statusCode: 200,
      message: "Product Deleted Successfully",
      data: result,
    });
  }
);

export const ProductController = {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
};