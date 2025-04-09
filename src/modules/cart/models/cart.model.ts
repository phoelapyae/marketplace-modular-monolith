import { BelongsTo, Column, DataType, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import User from "../../user/models/user.model";
import CartItem from "./cart-item.model";

@Table({
    tableName: 'carts',
    timestamps: true
})

export default class Cart extends Model{
    @ForeignKey(() => User)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
        unique: true
    })
    userId!: number

    @BelongsTo(() => User)
    user!: User

    @HasMany(() => CartItem)
    items!: CartItem[]
}