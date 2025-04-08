import { Transaction } from "sequelize";
import { CreateOrderDto, UpdateOrderStatusDto } from "../dto/order.dto";
import OrderItem from "../models/order-item.model";
import Order, { OrderStatus } from "../models/order.model";

export interface OrderRepositoryInterface {
    findAll(): Promise<Order[]>;
    findById(id: number): Promise<Order | null>;
    findByUserId(userId: number): Promise<Order[]>;
    // findByStatus(status: OrderStatus): Promise<Order[]>;
    create(orderData: any, option?: {transaction?: Transaction}): Promise<Order>;
    createOrderItems(items: any[], option?: {transaction?: Transaction}): Promise<OrderItem[]>;
    updateStatus(id: number, statusData: UpdateOrderStatusDto): Promise<Order | null>;
}