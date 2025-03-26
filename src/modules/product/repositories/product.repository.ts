import { Op } from "sequelize";
import { ProductRepositoryInterface } from "../interfaces/product.repository.interface";
import Product from "../models/product.model";
import { CreateProductDto, UpdateProductDto } from "../dto/product.dto";
import User from "../../user/models/user.model";
import Shop from "../../shop/models/shop.model";
import Category from "../../category/models/category.model";

export class ProductRepository implements ProductRepositoryInterface {
    async findAll(): Promise<Product[]> {
        return Product.findAll({
            include: [
                {
                    model: User,
                    attributes: ['id', 'firstName', 'lastName'],
                },
                {
                    model: Shop,
                    attributes: ['id', 'name', 'slug'],
                },
                {
                    model: Category,
                    through: { attributes: ['id'] }, // Exclude junction table
                  },
            ]
        });
    }

    async findById(id: number): Promise<Product | null> {
        return Product.findByPk(id, {
            include: [
                {
                    model: User,
                    attributes: ['id', 'firstName', 'lastName'],
                },
                {
                    model: Shop,
                    attributes: ['id', 'name', 'slug'],
                },
                {
                    model: Category,
                    through: { attributes: ['id'] }, // Exclude junction table
                },
            ]
        });
    }

    async findBySellerId(sellerId: number): Promise<Product[]> {
        return Product.findAll({ where: { sellerId } });
    }

    async findByCategory(category: string): Promise<Product[]> {
        return Product.findAll();
    }

    async findByShopId(shopId: number): Promise<Product[]> {
        return Product.findAll({
            where: { shopId },
            include: [
                {
                    model: User,
                    attributes: ['id', 'firstName', 'lastName']
                },
                {
                    model: Category,
                    through: {attributes: []}
                }
            ]
        })
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