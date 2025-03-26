import { HttpException } from "../../../common/middleware/error.middleware";
import { CreateProductDto, ProductResponseDto, UpdateProductDto } from "../dto/product.dto";
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
            categories: product.categories ? product.categories.map((category: any) => ({
                id: category.id,
                name: category.name,
              })) : [],
            sellerId: product.sellerId,
            sellerName: product.seller ? `${product.seller.firstName} ${product.seller.lastName}` : 'Unknown',
            shopId: product.shopId || undefined,
            shopName: product.shop ? product.shop.name : undefined,
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

    async getProductsByCategory(category: string): Promise<ProductResponseDto[]> {
        const products = await this.productRepository.findByCategory(category);
        return products.map(this.mapProductToDto);
    }

    async getProductsByShopId(shopId: number): Promise<ProductResponseDto[]> {
        const products = await this.productRepository.findByShopId(shopId);
        return products.map(this.mapProductToDto);
    }

    async createProduct(productData: CreateProductDto): Promise<ProductResponseDto> {
        const product = await this.productRepository.create(productData);
        return this.mapProductToDto(product);
    }

    async updateProduct(id: number, sellerId: number, productData: UpdateProductDto): Promise<ProductResponseDto> {
        const product = await this.productRepository.findById(id);

        if (!product) {
            throw new HttpException(404, 'Product not found.');
        }

        if (sellerId !== product.sellerId) {
            throw new HttpException(403, 'You can only update your own products.');
        }

        const updateProduct = await this.productRepository.update(id, productData);
        return this.mapProductToDto(updateProduct);
    }

    async deleteProduct(id: number, sellerId: number): Promise<boolean> {
        const product = await this.productRepository.findById(id);

        if (!product) {
            throw new HttpException(404, 'Product not found.');
        }

        if (product.sellerId !== sellerId) {
            throw new HttpException(403, 'You can delete your own products.');
        }

        return this.productRepository.delete(id);
    }
}