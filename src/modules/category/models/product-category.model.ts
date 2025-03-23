import { Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import Product from "../../product/models/product.model";
import Category from "./category.model";

@Table({
    tableName: 'product-categories',
    timestamps: true
})
export default class ProductCategory extends Model {
    @ForeignKey(() => Product)
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    productId!: number;

    @ForeignKey(() => Category)
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    categoryId!: number
}