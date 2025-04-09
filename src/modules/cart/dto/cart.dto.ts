export interface AddToCartDto{
    productId: number;
    quantity: number
}

export interface UpdateCartItemDto{
    quantity: number
}

export interface CartItemResponseDto{
    id: number;
    productId: number;
    productName: number;
    price: number;
    quantity: number;
    totalPrice: number;
    imageUrl?: string
}

export interface CartResponseDto{
    id: number;
    userId: number;
    totalAmount: number;
    itemCount: number;
    items: CartItemResponseDto[]
}