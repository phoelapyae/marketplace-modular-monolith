import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import Product from "../../product/models/product.model";
import Order from "./order.model";

@Table({
    tableName: 'order_items',
    timestamps: true
})
export default class OrderItem extends Model {
    @ForeignKey(() => Product)
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    productId!: number;

    @BelongsTo(() => Product)
    product!: Product

    @ForeignKey(() => Order)
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    orderId!: number;

    @BelongsTo(() => Order)
    order!: Order

    @Column({
        type: DataType.STRING,
        allowNull: false,
        defaultValue: 1
    })
    quantity!: string;

    @Column({
        type: DataType.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 0
    })
    unitPrice!: number;

    @Column({
        type: DataType.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 0
    })
    totalPrice!: number;
}