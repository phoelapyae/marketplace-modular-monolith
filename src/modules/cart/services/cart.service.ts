import { HttpException } from "../../../common/middleware/error.middleware";
import Product from "../../product/models/product.model";
import { AddToCartDto, CartResponseDto, UpdateCartItemDto } from "../dto/cart.dto";
import { CartRepositoryInterface } from "../interfaces/cart.repository.interface";
import { CartRepository } from "../repositories/cart.repository";

export class CartService {
    private cartRepository: CartRepositoryInterface;

    constructor() {
        this.cartRepository = new CartRepository();
    }

    async getCart(userId: number): Promise<CartResponseDto> {
        const cart = await this.cartRepository.findByUserId(userId);

        if (!cart) {
            const cart = this.cartRepository.createCart(userId);
        }

        return this.mapCartToDto(cart);
    }

    async addToCart(userId: number, item: AddToCartDto): Promise<CartResponseDto> {
        const product = await Product.findByPk(item.productId);

        if (!product) {
            throw new HttpException(404, 'Product not found.');
        }

        if (product.stock < item.quantity) {
            throw new HttpException(400, `Not enought quantity and only ${product.stock} left.`);
        }

        let cart = await this.cartRepository.findByUserId(userId);

        if (!cart) {
            cart = await this.cartRepository.createCart(userId);
        }

        const existingItem = await this.cartRepository.findCartItem(cart.id, item.productId);

        if (existingItem)
        {
            const newQuantity = existingItem.quantity + item.quantity;

            if (product.stock < newQuantity) {
                throw new HttpException(400, `Cannot add more items. Only ${product.stock} items available.`);
            }

            await this.cartRepository.updateItem(existingItem.id, { quantity: newQuantity });
        }
        else
        {
            await this.cartRepository.addItem(cart.id, item);
        }

        const updatedCart = await this.cartRepository.findByUserId(userId);
        return this.mapCartToDto(updatedCart);
    }

    async updateCartItem(userId: number, cartItemId: number, data: UpdateCartItemDto): Promise<CartResponseDto> {
        const cart = await this.cartRepository.findByUserId(userId);

        if (!cart) {
            throw new HttpException(404, 'Cart not found.');
        }

        const cartItem = cart.items.find(item => item.id === cartItemId);

        if (!cartItem) {
            throw new HttpException(404, 'Cart item not found.');
        }

        if (data.quantity > 0) {
            const product = await Product.findByPk(cartItem.productId);

            if (!product) {
                throw new HttpException(404, 'Product not found.');
            }

            if (product.stock < data.quantity) {
                throw new HttpException(400, `Not enough quantity. Only ${product.stock} quantity left.`);
            }
        }

        if (data.quantity <= 0)
        {
            await this.cartRepository.removeItem(cartItemId);
        }
        else
        {
            await this.cartRepository.updateItem(cartItemId, data);
        }

        const updatedCart = await this.cartRepository.findByUserId(userId);
        return this.mapCartToDto(updatedCart);
    }

    async removeCartItem(userId: number, cartItemId: number): Promise<CartResponseDto> {
        const cart = await this.cartRepository.findByUserId(userId);

        if (!cart) {
            throw new HttpException(404, 'Cart not found.');
        }

        const cartItem = cart.items.find(item => item.id === cartItemId);

        if (!cartItem) {
            throw new HttpException(404, 'Cart item not found.');
        }

        await this.cartRepository.removeItem(cartItem.id);

        const updatedCart = await this.cartRepository.findByUserId(userId);

        return this.mapCartToDto(updatedCart);
    }

    async clearCartItems(userId: number): Promise<CartResponseDto> {
        const cart = await this.cartRepository.findByUserId(userId);

        if (!cart) {
            throw new HttpException(404, 'Cart not found.');
        }

        await this.cartRepository.clearCart(cart.id);

        const updatedCart = await this.cartRepository.findByUserId(userId);

        return this.mapCartToDto(updatedCart);
    }

    private mapCartToDto(cart: any): CartResponseDto {
        const items = cart.items ? cart.items.map((item: any) => ({
            id: item.id,
            productId: item.productId,
            productName: item.product ? item.product.name : 'Unknow product',
            price: item.product ? item.product.price : 0,
            quantity: item.quantity,
            totalPrice: item.product ? item.product.price * item.quantity : 0,
            imageUrl: item.product ? item.product.imageUrl : undefined
        })) : [];

        const totalAmount = items.reduce((sum: number, item: any) => sum + item.totalPrice, 0);
        const itemCount = items.reduce((sum: number, item: any) => sum + item.quantity, 0);

        return {
            id: cart.id,
            userId: cart.userId,
            items,
            totalAmount,
            itemCount
        }
    }
}