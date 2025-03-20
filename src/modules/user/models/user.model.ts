import { Table, Model, Column, DataType, HasMany } from "sequelize-typescript";
import { Order } from "../../order/models/order.model";

@Table({
    tableName: 'users',
    timestamps: true
})

export class User extends Model {
    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    firstName!: string;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    lastName!: string

    @Column({
        type: DataType.STRING,
        allowNull: false,
        unique: true
    })
    email!: string

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    password!: string

    @Column({
        type: DataType.ENUM('user', 'seller', 'admin'),
        defaultValue: 'user'
    })
    role!: 'user' | 'seller' | 'admin'

    @Column({
        type: DataType.STRING,
        allowNull: true
    })
    address?: string;

    @Column({
        type: DataType.STRING,
        allowNull: true
    })
    phone?: string;

    @HasMany(() => Order)
    orders!: Order[]
}