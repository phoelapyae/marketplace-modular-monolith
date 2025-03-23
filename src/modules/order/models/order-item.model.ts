import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import Product from "../../product/models/product.model";

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
    productId!: number

    @BelongsTo(() => Product)
    product!: Product
}