import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import User from "../../user/models/user.model";

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
    userId!: number
        
    @BelongsTo(() => User)
    user!: User
}