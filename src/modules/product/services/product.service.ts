import { HttpException } from "../../../common/middleware/error.middleware";
import { ProductResponseDto } from "../dto/product.dto";
import { ProductRepositoryInterface } from "../interfaces/product.repository.interface";
import { ProductRepository } from "../repositories/product.repository";

export class ProductService {
    private productRepository: ProductRepositoryInterface;

    private mapProductToDto(product: any): ProductResponseDto {
        return {
            id: product.id,
            name: product.name,
            description: product.description,
            price: product.price,
            stock: product.stock,
            imageUrl: product.imageUrl,
            categories: product.categories,
            sellerId: product.sellerId,
            createdAt: product.createAt,
            updatedAt: product.updatedAt
        }
    }

    constructor() {
        this.productRepository = new ProductRepository();
    }
    
    async getAllProducts(): Promise<ProductResponseDto[]> {
        const products = await this.productRepository.findAll();
        return products.map(this.mapProductToDto);
    }

    async getProductById(id: number): Promise<ProductResponseDto> {
        const product = await this.productRepository.findById(id);

        if (!product) {
            throw new HttpException(404, 'Product not found.');
        }

        return this.mapProductToDto(product);
    }

    async getProductsBySellerId(sellerId: number): Promise<ProductResponseDto[]> {
        const products = await this.productRepository.findBySellerId(sellerId);
        return products.map(this.mapProductToDto);
    }

    async getProductsByCategory(category: string): Promise<ProductResponseDto[]>{
        const products = await this.productRepository.findByCategory(category);
        return products.map(this.mapProductToDto);
    }
}