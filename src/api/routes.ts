import { Router } from "express";
import { userRoutes } from "../modules/user/routes/user.routes";
import { productRoutes } from "../modules/product/routes/product.routes";

const router = Router();

router.use('/users', userRoutes);
router.use('/products', productRoutes);

export const apiRoutes = router;