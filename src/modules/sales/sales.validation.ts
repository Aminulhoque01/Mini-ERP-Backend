import { z } from "zod";

export const createSaleValidation =
  z.object({
    body: z.object({
      customer: z.string().optional(),

      products: z.array(
        z.object({
          product: z.string(),

          quantity: z.number().min(1),
        })
      ),

      discount: z.number().optional(),

      vat: z.number().optional(),

      paidAmount: z.number().optional(),

      paymentMethod: z.enum([
        "Cash",
        "Bkash",
        "Nagad",
        "Card",
        "Bank",
      ]),

      note: z.string().optional(),
    }),
  });