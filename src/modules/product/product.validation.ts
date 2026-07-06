import { z } from "zod";

export const createProductValidation = z.object({
  body: z.object({
    productName: z.string(),
    sku: z.string(),
    category: z.string(),
    purchasePrice: z.number(),
    sellingPrice: z.number(),
    stockQuantity: z.number(),
    productImage: z.string(),
  }),
});

export const updateProductValidation = z.object({
  body: z.object({
    productName: z.string().optional(),
    sku: z.string().optional(),
    category: z.string().optional(),
    purchasePrice: z.number().optional(),
    sellingPrice: z.number().optional(),
    stockQuantity: z.number().optional(),
    productImage: z.string().optional(),
  }),
});