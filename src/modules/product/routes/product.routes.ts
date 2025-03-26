import { Router } from "express";
import { ProductController } from "../controllers/product.controller";
import { authMiddleware } from "../../../common/middleware/auth.middleware";

const router = Router();
const productController = new ProductController();

router.get('/', productController.getAllProducts);
router.get('/:id', productController.getProductById);
router.get('/seller/:sellerId', productController.getProductsBySellerId);
router.get('/category/:category', productController.getProductsByCategory);

router.post('/', authMiddleware, productController.createProduct);
router.put('/:id', authMiddleware, productController.updateProduct);
router.delete('/:id', authMiddleware, productController.deleteProduct);
router.get('/shop/:shopId', productController.getProdctsByShopId);

export const productRoutes = router;