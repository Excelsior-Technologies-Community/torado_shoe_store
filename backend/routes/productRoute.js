import express from "express";
import {
  addProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  getFilterOptions,
} from "../controllers/productController.js";
import { uploadProductImages } from "../config/multer.js";

const router = express.Router();

router.get("/filters", getFilterOptions);

router.get("/", getProducts);

router.get("/:id", getProductById);

router.post("/", uploadProductImages.array("images", 5), addProduct);

router.put("/:id", uploadProductImages.array("images", 5), updateProduct);

router.delete("/:id", deleteProduct);

export default router;
