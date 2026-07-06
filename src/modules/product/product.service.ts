import QueryBuilder from "../../builder/QueryBuilder";
import { IProduct } from "./product.interface";
import Product from "./product.model";

const searchableFields = [
  "productName",
  "sku",
  "category",
];


const createProduct = async (payload: IProduct) => {
  const exists = await Product.isProductExists(payload.sku);

  if (exists) {
    throw new Error("SKU already exists");
  }

  const result = await Product.create(payload);

  return result;
};

const getAllProducts = async (
  query: Record<string, unknown>
) => {
  const productQuery = new QueryBuilder(
    Product.find({
      isDeleted: false,
    }),
    query
  )
    .search(searchableFields)
    .filter()
    .sort()
    .paginate();

  const result = await productQuery.modelQuery;

  const meta = await productQuery.countTotal();

  return {
    meta,
    result,
  };
};

const getSingleProduct = async (id: string) => {
  return await Product.findOne({
    _id: id,
    isDeleted: false,
  });
};

const updateProduct = async (
  id: string,
  payload: Partial<IProduct>
) => {
  return await Product.findByIdAndUpdate(
    id,
    payload,
    {
      returnDocument: "after",
      runValidators: true,
    }
  );
};

const deleteProduct = async (id: string) => {
  return await Product.findByIdAndUpdate(
    id,
    {
      isDeleted: true,
    },
    {
      new: true,
    }
  );
};

export const ProductServices = {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
};