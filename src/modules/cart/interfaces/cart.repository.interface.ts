import { AddToCartDto, UpdateCartItemDto } from "../dto/cart.dto";
import CartItem from "../models/cart-item.model";
import Cart from "../models/cart.model";

export interface CartRepositoryInterface {
    findByUserId(userId: number): Promise<Cart | null>;
    
    createCart(userId: number): Promise<Cart>;

    findCartItem(cardId: number, productId: number): Promise<CartItem | null>;

    addItem(cardId: number, item: AddToCartDto): Promise<CartItem>;

    updateItem(cartItemId: number, data: UpdateCartItemDto): Promise<CartItem | null>;
    
    removeItem(cartItemId: number): Promise<boolean>;

    clearCart(cartId: number): Promise<boolean>;
}