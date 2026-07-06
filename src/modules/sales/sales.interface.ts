import { Types } from "mongoose";

export interface ISaleProduct {
  product: Types.ObjectId;
  quantity: number;
  price: number;
  subTotal: number;
}

export interface ISale {
  invoiceNo: string;

  products: ISaleProduct[];

  grandTotal: number;

  soldBy: Types.ObjectId;

  createdAt?: Date;

  updatedAt?: Date;
}