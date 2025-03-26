import { Router } from "express";
import { CategoryController } from "../controllers/category.controller";
import { authMiddleware } from "../../../common/middleware/auth.middleware";

const router = Router();
const categoryController = new CategoryController();

router.get('/', categoryController.getAllCategories);
router.get('/:id', categoryController.getCategoryById);

router.post('/', authMiddleware, categoryController.createCategory);
router.put('/:id', authMiddleware, categoryController.updateCategory);
router.delete('/:id', authMiddleware, categoryController.deleteCategory);

export const categoryRoutes = router;