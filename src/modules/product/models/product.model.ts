import { BelongsTo, BelongsToMany, Column, DataType, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import User from "../../user/models/user.model";
import CartItem from "../../cart/models/cart-item.model";
import OrderItem from "../../order/models/order-item.model";
import Category from "../../category/models/category.model";
import ProductCategory from "../../category/models/product-category.model";

@Table({
    tableName: 'products',
    timestamps: true
})
    
export default class Product extends Model {
    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    name!: string;

    @Column({
        type: DataType.TEXT,
        allowNull: false
    })
    description!: string;

    @Column({
        type: DataType.DECIMAL(10, 2),
        allowNull: false
    })
    price!: number;

    @Column({
        type: DataType.INTEGER,
        allowNull: false,
        defaultValue: 0
    })
    stock!: number;

    @Column({
        type: DataType.STRING,
        allowNull: true
    })
    imageUrl?: string;

    @ForeignKey(() => User)
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    sellerId!: number;

    @BelongsTo(() => User)
    seller!: User;

    @HasMany(() => OrderItem)
    orderItems!: OrderItem[]

    @HasMany(() => CartItem)
    cartItems!: CartItem[]

    @BelongsToMany(() => Category, () => ProductCategory)
    categories!: Category[]
}