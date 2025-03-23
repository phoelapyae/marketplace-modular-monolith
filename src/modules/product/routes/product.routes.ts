import { Router } from "express";
import { ProductController } from "../controllers/product.controller";

const router = Router();
const productController = new ProductController();

router.get('/', productController.getAllProducts);
router.get('/:id', productController.getProductById);
router.get('/seller/:sellerId', productController.getProductsBySellerId);
router.get('/category/:category', productController.getProductsByCategory);

export const productRoutes = router;