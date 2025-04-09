import Product from "../../product/models/product.model";
import { AddToCartDto, UpdateCartItemDto } from "../dto/cart.dto";
import { CartRepositoryInterface } from "../interfaces/cart.repository.interface";
import CartItem from "../models/cart-item.model";
import Cart from "../models/cart.model";

export class CartRepository implements CartRepositoryInterface {
    async findByUserId(userId: number): Promise<Cart|null> {
        return Cart.findOne({
            where: { userId },
            include: {
                model: CartItem,
                include: [Product]
            }
        })
    }

    async createCart(userId: number): Promise<Cart> {
        return Cart.create({ userId });
    }

    async findCartItem(cartId: number, productId: number): Promise<CartItem | null> {
        return CartItem.findOne({
            where: {
                cartId,
                productId
            }
        });
    }

    async addItem(cartId: number, item: AddToCartDto): Promise<CartItem> {
        return CartItem.create({
            cartId,
            productId: item.productId,
            quantity: item.quantity
        });
    }

    async updateItem(cartItemId: number, data: UpdateCartItemDto): Promise<CartItem|null> {
        const cartItem = await CartItem.findOne({
            where: {cartItemId}
        });

        if (!cartItem) {
            return null;
        }

        return cartItem.update(data);
    }

    async removeItem(cartItemId: number): Promise<boolean> {
        const deleted = await CartItem.destroy({ where: {id: cartItemId} });
        return deleted > 0;
    }

    async clearCart(cartId: number): Promise<boolean> {
        const deleted = await CartItem.destroy({ where: { cartId } });
        return deleted > 0;
    }
}