import { Order, Transaction } from "sequelize";
import { CreateOrderDto, OrderItemResponseDto, OrderResponseDto, UpdateOrderStatusDto } from "../dto/order.dto";
import { OrderRepositoryInterface } from "../interfaces/order.repository.interface";
import { OrderRepository } from "../repositories/order.repository";
import { sequelize } from "../../../config/database";
import Product from "../../product/models/product.model";
import { HttpException } from "../../../common/middleware/error.middleware";
import { nextTick } from "process";

export class OrderService {
    private orderRepository: OrderRepositoryInterface;

    constructor() {
        this.orderRepository = new OrderRepository();
    }

    private mapOrderToDto(order: any): OrderResponseDto {
        const items: OrderItemResponseDto[] = order.items.map((item: any) => ({
            id: item.id,
            productId: item.productId,
            productName: item.product ? item.product.name : 'Unknown product',
            quantity: item.quantity,
            unitPrice: item.unitPrice,
            totalPrice: item.totalPrice
        }));

        return {
            id: order.id,
            userId: order.userId,
            status: order.status,
            totalAmount: order.totalAmount,
            shippingAddress: order.shippingAddress,
            trackingNumber: order.trackingNumber,
            paidAt: order.paidAt,
            items,
            createdAt: order.createdAt,
            updatedAt: order.updatedAt
        }
    }

    async getAllOrders(): Promise<OrderResponseDto[]> {
        const orders = await this.orderRepository.findAll();
        return orders.map(this.mapOrderToDto);
    }

    async getOrdersByUserId(userId: number): Promise<OrderResponseDto[]> {
        const orders = await this.orderRepository.findByUserId(userId);
        return orders.map(this.mapOrderToDto);
    }

    async getOrderById(id: number): Promise<OrderResponseDto> {
        const order = await this.orderRepository.findById(id);

        if (!order) {
            throw new HttpException(404, 'Order not found.');
        }

        return this.mapOrderToDto(order);
    }

    async createOrder(userId: number, orderData: CreateOrderDto): Promise<OrderResponseDto> {
        let transaction: Transaction | undefined;

        try {
            transaction = await sequelize.transaction();

            let totalAmount = 0;
            let orderItems = [];

            for (const item of orderData.items){
                const product = await Product.findByPk(item.productId, { transaction });

                if (!product) {
                    throw new HttpException(404, `Product with ID ${item.productId} not found.`);
                }

                if (product.stock < item.quantity) {
                    throw new HttpException(400, `Not enough stock for product ${product.name}`);
                }

                await product.update(
                    { stock: product.stock - item.quantity },
                    {transaction}
                )

                const itemTotalPrice = parseFloat(product.price.toString()) * item.quantity;
                totalAmount += itemTotalPrice;

                orderItems.push({
                    productId: product.id,
                    quantity: item.quantity,
                    unitPrice: product.price,
                    totalPrice: itemTotalPrice
                });
            }

            const order = await this.orderRepository.create({
                userId,
                totalAmount,
                shippingAddress: orderData.shippingAddress,
                trackingNumber: orderData.trackingNumber
            }, { transaction });
            
            const items = await this.orderRepository.createOrderItems(
                orderItems.map(item => ({
                    ...item,
                    orderId: order.id
                })),
                {transaction}
            );

            await transaction.commit();

            const createdOrder = await this.orderRepository.findById(order.id);

            return this.mapOrderToDto(createdOrder);
        } catch (error) {
            if (transaction) {
                await transaction.rollback();
            }
            throw error;
        }
    }

    async updateOrderStatus(id: number, orderData: UpdateOrderStatusDto): Promise<OrderResponseDto> {
        const updatedOrder = await this.orderRepository.updateStatus(id, orderData);

        if (!updatedOrder) {
            throw new HttpException(404, 'Order not found.');
        }

        return this.mapOrderToDto(updatedOrder);
    }
}