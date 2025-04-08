import { Router } from "express";
import { userRoutes } from "../modules/user/routes/user.routes";
import { productRoutes } from "../modules/product/routes/product.routes";
import { categoryRoutes } from "../modules/category/routes/category.routes";
import { orderRoutes } from "../modules/order/routes/order.routes";

const router = Router();

router.use('/users', userRoutes);
router.use('/products', productRoutes);
router.use('/categories', categoryRoutes);
router.use('/orders', orderRoutes);

export const apiRoutes = router;