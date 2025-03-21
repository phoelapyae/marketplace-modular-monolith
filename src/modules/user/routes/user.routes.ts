import { Router } from "express";
import { UserController } from "../controllers/user.controller";
import { authMiddleware } from "../../../common/middleware/auth.middleware";

const router = Router();
const userController = new UserController();

// public routes
router.post('/register', userController.createUser);
router.post('/login', userController.login);

// Protected routes
router.get('/', authMiddleware, userController.getAllUsers);
router.get('/:id', authMiddleware, userController.getUserById);
router.put('/:id', authMiddleware, userController.updateUser);
router.delete('/:id', authMiddleware, userController.deleteUser);

export const userRoutes = router;