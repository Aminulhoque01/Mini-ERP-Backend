import Product from "../product/product.model";
import Sale from "../sales/sales.model";

const getDashboard = async () => {
  const totalProducts = await Product.countDocuments({
    isDeleted: false,
  });

  const totalSales = await Sale.countDocuments();

  const lowStockProducts = await Product.find({
    stockQuantity: { $lt: 5 },
    isDeleted: false,
  })
    .select("productName sku stockQuantity productImage")
    .sort({ stockQuantity: 1 });

  const lowStock = lowStockProducts.length;

  const totalRevenue = await Sale.aggregate([
    {
      $group: {
        _id: null,
        totalRevenue: {
          $sum: "$grandTotal",
        },
      },
    },
  ]);

  return {
    totalProducts,
    totalSales,
    totalRevenue:
      totalRevenue.length > 0
        ? totalRevenue[0].totalRevenue
        : 0,
    lowStock,
    lowStockProducts,
  };
};

export const DashboardService = {
  getDashboard,
};