import { BelongsTo, Column, DataType, ForeignKey, HasMany, Model, Table } from "sequelize-typescript"
import User from "../../user/models/user.model";
import Product from "../../product/models/product.model";

@Table({
    tableName: 'shops',
    timestamps: true
})
export default class Shop extends Model {
    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    name!: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
        unique: true
    })
    slug!: string;

    @Column({
        type: DataType.STRING,
        allowNull: true
    })
    description?: string;

    @Column({
        type: DataType.STRING,
        allowNull: true
    })
    logoUrl?: string;

    @Column({
        type: DataType.STRING,
        allowNull: true
    })
    bannerUrl?: string;

    @Column({
        type: DataType.STRING,
        allowNull: true
    })
    contactEmail?: string;

    @Column({
        type: DataType.STRING,
        allowNull: true
    })
    contactPhone?: string;

    @Column({
        type: DataType.STRING,
        allowNull: true
    })
    address?: string;

    @Column({
        type: DataType.BOOLEAN,
        allowNull: false,
        defaultValue: true
    })
    isActive!: boolean;
    
    @ForeignKey(() => User)
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    ownerId!: number;

    @BelongsTo(() => User)
    owner!: User

    @HasMany(() => Product)
    products!: Product[]
}