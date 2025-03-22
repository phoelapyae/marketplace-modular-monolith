import { Request, Response, NextFunction } from "express";
import { UserService } from "../services/user.service";
import { CreateUserDto, UpdateUserDto } from "../dto/user.dto";
import { handleSuccess } from "../../../common/resources/handler";

export class UserController {
    userService: UserService;

    constructor() {
        this.userService = new UserService();
    }

    getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const users = await this.userService.getAllUsers();
            handleSuccess(res, 200, 'Retrieved users list successfully', users);
        } catch (error) {
            next(error);
        }
    }

    getUserById = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = parseInt(req.params.id, 10);
            const user = await this.userService.getUserById(id);
            handleSuccess(res, 200, 'Retrieved user successfully.', user);
        } catch (error) {
            next(error);
        }
    }

    createUser = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userData: CreateUserDto = req.body;
            const newUser = await this.userService.createUser(userData);
            handleSuccess(res, 201, 'Created user successfully.', newUser);
        } catch (error) {
            next(error);
        }
    }

    updateUser = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = parseInt(req.params.id, 10);
            const userData = req.body;
            const updatedUser = await this.userService.updateUser(id, userData);
            handleSuccess(res, 200, 'Updated user successfully.', updatedUser);
        } catch (error) {
            next(error);
        }
    }

    deleteUser = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = parseInt(req.params.id, 10);
            await this.userService.deleteUser(id);
            handleSuccess(res, 204, 'Deleted user successfully.', null);
        } catch (error) {
            next(error);
        }
    }

    login = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { email, password } = req.body;
            const result = await this.userService.login(email, password);
            res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    }
}