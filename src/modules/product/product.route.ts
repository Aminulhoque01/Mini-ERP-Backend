import { Router } from "express";
import { ProductController } from "./product.controller";
import { auth } from "../../middleware/auth";
import { authorize } from "../../middleware/role";
import { upload } from "../../middleware/upload";
 

const ProductRoutes = Router();

ProductRoutes.post(
  "/create",
  auth(),
  authorize("admin", "manager"),
  upload.single("image"),
 
  ProductController.createProduct
);

ProductRoutes.get(
  "/",
  ProductController.getAllProducts
);

ProductRoutes.get(
  "/:id",
  ProductController.getSingleProduct
);

ProductRoutes.patch(
  "/:id",
 auth(),
  authorize("admin", "manager"),
  ProductController.updateProduct
);

ProductRoutes.delete(
  "/:id",
  auth(),
  authorize("admin", "manager"),
  ProductController.deleteProduct
);

export default ProductRoutes;