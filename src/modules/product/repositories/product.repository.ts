import { Op } from "sequelize";
import { ProductRepositoryInterface } from "../interfaces/product.repository.interface";
import Product from "../models/product.model";
import { CreateProductDto, UpdateProductDto } from "../dto/product.dto";

export class ProductRepository implements ProductRepositoryInterface {
    async findAll(): Promise<Product[]> {
        return Product.findAll();
    }

    async findById(id: number): Promise<Product | null> {
        return Product.findByPk(id);
    }

    async findBySellerId(sellerId: number): Promise<Product[]> {
        return Product.findAll({ where: { sellerId } });
    }

    async findByCategory(category: string): Promise<Product[]> {
        return Product.findAll({
            where: {
                categories: {
                    [Op.contains]: [category]
                }
            }
        });
    }

    async create(productData: CreateProductDto): Promise<Product> {
        return Product.create(productData as any);
    }

    async update(id: number, updateData: UpdateProductDto): Promise<Product | null> {
        const product = await Product.findByPk(id);

        if (!product) {
            return null;
        }

        return product?.update(updateData) || null;
    }

    async delete(id: number): Promise<boolean > {
        const deleted = await Product.destroy({ where: { id } });
        return deleted > 0;
    }
}