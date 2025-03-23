import { BelongsToMany, Column, DataType, Model, Table } from "sequelize-typescript";
import Product from "../../product/models/product.model";
import ProductCategory from "./product-category.model";

@Table({
    tableName: 'categories',
    timestamps: true
})
export default class Category extends Model {
    @Column({
        type: DataType.STRING,
        allowNull: false,
        unique: true
    })
    name!: string

    @Column({
        type: DataType.TEXT,
        allowNull: true
    })
    description?: string

    @BelongsToMany(() => Product, () => ProductCategory)
    products!: Product[]
}