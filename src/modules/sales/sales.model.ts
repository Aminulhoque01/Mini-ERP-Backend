import { Schema, model } from "mongoose";
import { ISale } from "./sales.interface";

const saleSchema = new Schema<ISale>(
  {
    invoiceNo: {
      type: String,
      required: true,
      unique: true,
    },

    products: [
      {
        product: {
          type: Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },

        quantity: {
          type: Number,
          required: true,
          min: 1,
        },

        price: {
          type: Number,
          required: true,
        },

        subTotal: {
          type: Number,
          required: true,
        },
      },
    ],

    grandTotal: {
      type: Number,
      required: true,
    },

    soldBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Sale = model<ISale>("Sale", saleSchema);

export default Sale;