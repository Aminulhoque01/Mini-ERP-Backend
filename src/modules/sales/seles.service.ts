import mongoose from "mongoose";
import httpStatus from "http-status";

import ApiError from "../../utils/ApiError";

import Sale from "./sales.model";
import Product from "../product/product.model";

import { ISale } from "./sales.interface";

const createSale = async (
  payload: Omit<ISale, "invoiceNo" | "grandTotal" | "soldBy">,
  userId: string
) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    // Generate Invoice Number
    const totalSales = await Sale.countDocuments();

    const invoiceNo = `INV-${String(totalSales + 1).padStart(6, "0")}`;

    let grandTotal = 0;

    const saleProducts = [];

    for (const item of payload.products) {
      const product = await Product.findById(item.product).session(session);

      if (!product) {
        throw new ApiError(
          httpStatus.NOT_FOUND,
          "Product not found"
        );
      }

      if (product.isDeleted) {
        throw new ApiError(
          httpStatus.BAD_REQUEST,
          "Product deleted"
        );
      }

      if (product.stockQuantity < item.quantity) {
        throw new ApiError(
          httpStatus.BAD_REQUEST,
          `${product.productName} stock is insufficient`
        );
      }

      // Reduce Stock
      product.stockQuantity -= item.quantity;

      await product.save({ session });

      // Calculate
      const subTotal =
        product.sellingPrice * item.quantity;

      grandTotal += subTotal;

      saleProducts.push({
        product: product._id,
        quantity: item.quantity,
        price: product.sellingPrice,
        subTotal,
      });
    }

    const sale = await Sale.create(
      [
        {
          invoiceNo,
          products: saleProducts,
          grandTotal,
          soldBy: userId,
        },
      ],
      { session }
    );

    await session.commitTransaction();

    session.endSession();

    return sale[0];
  } catch (error) {
    await session.abortTransaction();

    session.endSession();

    throw error;
  }
};

export const SalesService = {
  createSale,
};