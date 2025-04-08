import { Router } from "express";
import { authMiddleware } from "../../../common/middleware/auth.middleware";
import { OrderController } from "../controllers/order.controller";

const router = Router();
const orderController = new OrderController();

router.get('/', authMiddleware, orderController.getAllOrders);
router.get('/my-orders', authMiddleware, orderController.getMyOrders);
router.get('/:id', authMiddleware, orderController.getOrderById);
router.post('/', authMiddleware, orderController.createOrder);
router.patch('/:id', authMiddleware, orderController.updateOrderStatus);

export const orderRoutes = router;