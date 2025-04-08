import { OrderStatus } from "../models/order.model";

export interface OrderItemDto {
    productId: number;
    quantity: number;
}

export interface CreateOrderDto {
    items: OrderItemDto[],
    shippingAddress: string,
    trackingNumber: string
}

export interface UpdateOrderStatusDto {
    status: OrderStatus,
    trackingNumber?: string
}

export interface OrderItemResponseDto {
    id: number;
    productId: number;
    productName: string;
    quantity: number;
    unitPrice: number;
    totalPrice: number;
}

export interface OrderResponseDto {
    id: number;
    userId: number;
    status: OrderStatus;
    totalAmount: number;
    shippingAddress: string;
    trackingNumber?: string;
    paidAt?: Date;
    items: OrderItemResponseDto[];
    createdAt: Date;
    updatedAt: Date;
}