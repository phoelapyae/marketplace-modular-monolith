export interface CreateProductDto {
    name: string;
    description: string;
    price: number;
    stock: number;
    imageUrl?: string;
    categoryIds: number[];
    sellerId: number
}

export interface UpdateProductDto {
    name?: string;
    description?: string;
    price?: number;
    stock?: number;
    imageUrl?: string;
    categoryIds?: number[]
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
    // sellerName: string;
    createdAt: Date,
    updatedAt: Date
}