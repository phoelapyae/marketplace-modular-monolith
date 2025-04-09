import { CartResponseDto } from "../dto/cart.dto";
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