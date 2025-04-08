import { Transaction } from "sequelize";
import Product from "../../product/models/product.model";
import User from "../../user/models/user.model";
import { OrderRepositoryInterface } from "../interfaces/order.repository.interface";
import OrderItem from "../models/order-item.model";
import Order from "../models/order.model";
import { UpdateOrderStatusDto } from "../dto/order.dto";

export class OrderRepository implements OrderRepositoryInterface {
    async findAll(): Promise<Order[]> {
        return Order.findAll({
            include: [
                {
                    model: OrderItem,
                    include: [Product]
                },
                User
            ]
        })
    }

    async findByUserId(userId: number): Promise<Order[]> {
        return Order.findAll({
            where: { userId },
            include: {
                model: OrderItem,
                include: [Product]
            }
        });
    }

    async create(orderData: any, option?: {transaction?: Transaction}): Promise<Order> {
        return Order.create(orderData, option);
    }

    async createOrderItems(items: any[], option?: {transaction?: Transaction}): Promise<OrderItem[]> {
        return OrderItem.bulkCreate(items, option);
    }

    async findById(id: number): Promise<Order | null> {
        return Order.findByPk(id, {
            include: [
                {
                    model: OrderItem,
                    include: [Product]
                }
            ]
        });
    }

    async updateStatus(id: number, statusData: UpdateOrderStatusDto): Promise<Order|null> {
        const order = await Order.findByPk(id, {
            include: {
                model: OrderItem,
                include: [Product]
            }
        });
        if (!order) {
            return null;
        }
        return order.update(statusData);
    }
}