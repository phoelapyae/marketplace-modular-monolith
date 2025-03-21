import { Table, Model, Column, DataType, HasMany } from "sequelize-typescript";

@Table({
    tableName: 'users',
    timestamps: true
})

export default class User extends Model {
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
}