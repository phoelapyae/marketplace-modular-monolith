import { CreateProductDto, UpdateProductDto } from "../dto/product.dto";
import Product from "../models/product.model";

export interface ProductRepositoryInterface {
    findAll(): Promise<Product[]>;

    findById(id: number): Promise<Product | null>;

    findBySellerId(sellerId: number): Promise<Product[]>;

    findByCategory(category: string): Promise<Product[]>;

    findByShopId(shopId: number): Promise<Product[]>;

    create(productData: CreateProductDto): Promise<Product>;

    update(id: number, productData: UpdateProductDto): Promise<Product | null>;

    delete(id: number): Promise<boolean>;
}