import { Router } from "express";
import { CartController } from "../controllers/cart.controller";
import { authMiddleware } from "../../../common/middleware/auth.middleware";

const router = Router();
const cartController = new CartController();

router.get('/', authMiddleware, cartController.getCart);
router.post('/', authMiddleware, cartController.addToCart);
router.put('/:id', authMiddleware, cartController.updateCartItem);
router.delete('/:cartItemId', authMiddleware, cartController.removeCartItem);
router.delete('/', authMiddleware, cartController.clearCart);

export const cartRoutes = router;