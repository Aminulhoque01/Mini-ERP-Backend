import { Model } from "mongoose";

export interface IProduct {
  productName: string;
  sku: string;
  category: string;
  purchasePrice: number;
  sellingPrice: number;
  stockQuantity: number;
  productImage: string;
  isDeleted: boolean;
}

export interface ProductModel extends Model<IProduct> {
  isProductExists(sku: string): Promise<IProduct | null>;
}