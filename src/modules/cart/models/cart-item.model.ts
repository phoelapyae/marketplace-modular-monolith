import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import Product from "../../product/models/product.model";
import Cart from "./cart.model";

@Table({
    tableName: 'cart_items',
    timestamps: true
})
export default class CartItem extends Model {
    @ForeignKey(() => Cart)
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    cartId!: number

    @ForeignKey(() => Product)
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    productId!: number

    @Column({
        type: DataType.INTEGER,
        allowNull: false,
        defaultValue: 0
    })
    quantity!: number

    @BelongsTo(() => Product)
    product!: Product

    @BelongsTo(() => Cart)
    cart!: Cart
}