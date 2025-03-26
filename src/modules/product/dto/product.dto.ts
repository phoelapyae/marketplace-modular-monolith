export interface CreateProductDto {
    name: string;
    description: string;
    price: number;
    stock: number;
    imageUrl?: string;
    categoryIds: number[];
    sellerId: number;
    shopId: number;
}

export interface UpdateProductDto {
    name?: string;
    description?: string;
    price?: number;
    stock?: number;
    imageUrl?: string;
    categoryIds?: number[];
    shopId?: number;
}

export interface ProductResponseDto {
    id: number;
    name: string;
    description: string;
    price: number;
    stock: number;
    imageUrl?: string;
    categories: {
        id: number;
        name: string;
    }[];
    sellerId: number;
    sellerName: string;
    shopId: number;
    shopName: string;
    createdAt: Date,
    updatedAt: Date
}