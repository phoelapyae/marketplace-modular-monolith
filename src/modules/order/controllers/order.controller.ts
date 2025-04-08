import { NextFunction, Request, Response } from "express";
import { OrderService } from "../services/order.service";
import { handleSuccess } from "../../../common/resources/handler";
import { CreateOrderDto, UpdateOrderStatusDto } from "../dto/order.dto";

export class OrderController {
    private orderService: OrderService;

    constructor() {
        this.orderService = new OrderService();
    }

    getAllOrders = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const orders = await this.orderService.getAllOrders();
            handleSuccess(res, 200, 'Retrieved orders successfully.', orders);
        } catch (error) {
            next(error);
        }
    }

    getMyOrders = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userId = req.user!.id;
            const orders = await this.orderService.getOrdersByUserId(userId);
            handleSuccess(res, 200, 'Retrieved my orders successfully.', orders);
        } catch (error) {
            next(error);
        }
    }

    getOrderById = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = parseInt(req.params.id, 10);
            const order = await this.orderService.getOrderById(id);
            return handleSuccess(res, 200, 'Retrieved order successfully.', order);
        } catch (error) {
            next(error);
        }
    }

    createOrder = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userId = req.user!.id;
            const orderData: CreateOrderDto = req.body;
            const newOrder = await this.orderService.createOrder(userId, orderData);
            handleSuccess(res, 200, 'Created order successfully.', newOrder);
        } catch (error) {
            next(error);
        }
    }

    updateOrderStatus = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = parseInt(req.params.id, 10);
            const statusData: UpdateOrderStatusDto = req.body;
            const order = await this.orderService.updateOrderStatus(id, statusData);
            handleSuccess(res, 200, 'Updated order status successfully.', order);
        } catch (error) {
            next(error);
        }
    }
}