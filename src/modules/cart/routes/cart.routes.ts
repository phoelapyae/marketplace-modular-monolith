import { Router } from "express";
import { CartController } from "../controllers/cart.controller";
import { authMiddleware } from "../../../common/middleware/auth.middleware";

const router = Router();
const cartController = new CartController();

router.get('/', authMiddleware, cartController.getCart);

export const cartRoutes = router;