import { BelongsTo, Column, DataType, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import User from "../../user/models/user.model";
import OrderItem from "./order-item.model";

export enum OrderStatus {
    PENDING    = 'pending',
    PROCESSING = 'processing',
    SHIPPED    = 'shipped',
    DELIVERED  = 'delivered',
    CANCELLED  = 'cancelled'
}

@Table({
    tableName: 'orders',
    timestamps: true
})

export default class Order extends Model {
    @ForeignKey(() => User)
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    userId!: number;
        
    @BelongsTo(() => User)
    user!: User

    @Column({
        type: DataType.ENUM(...Object.values(OrderStatus)),
        allowNull: false,
        defaultValue: OrderStatus.PENDING
    })
    status!: OrderStatus;

    @Column({
        type: DataType.DECIMAL(10, 2),
        allowNull: false
    })
    totalAmount!: number;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    shippingAddress!: string

    @Column({
        type: DataType.STRING,
        allowNull: true
    })
    trackingNumber?: string;

    @Column({
        type: DataType.DATE,
        allowNull: true
    })
    paidAt?: Date;

    @HasMany(() => OrderItem)
    items!: OrderItem[];
}