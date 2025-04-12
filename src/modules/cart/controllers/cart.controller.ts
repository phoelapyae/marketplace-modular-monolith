import { NextFunction, Request, Response } from "express";
import { CartService } from "../services/cart.service";
import { handleSuccess } from "../../../common/resources/handler";
import { AddToCartDto } from "../dto/cart.dto";

export class CartController {
    private cartService;

    constructor() {
        this.cartService = new CartService();
    }

    getCart = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userId = req.user!.id;
            console.log("User Id >>>> ", userId);
            const cart = await this.cartService.getCart(userId);
            handleSuccess(res, 200, 'Retrieved my cart successfully.', cart);
        } catch (error) {
            next(error);
        }
    }

    addToCart = async(req: Request, res: Response, next: NextFunction) => {
        try {
            const userId = req.user!.id;
            const itemData: AddToCartDto = req.body;
            const cart = await this.cartService.addToCart(userId, itemData);
            handleSuccess(res, 201, 'Added to cart successfully', cart);
        } catch (error) {
            next(error);
        }
    }

    updateCartItem = async(req: Request, res: Response, next: NextFunction) => {
        try {
            const userId = req.user!.id;
            const cartItemId = parseInt(req.params.id, 10);
            const cartItemData = req.body;
            const cart = await this.cartService.updateCartItem(userId, cartItemId, cartItemData);
            handleSuccess(res, 200, 'Updated item successfully.', cart);
        } catch (error) {
            next(error);
        }
    }

    removeCartItem = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userId = req.user!.id;
            const cartItemId = parseInt(req.params.cartItemId, 10);
            const cart = await this.cartService.removeCartItem(userId, cartItemId);
            handleSuccess(res, 200, 'Removed item successfully.', cart);
        } catch (error) {
            next(error);
        }
    }

    clearCart = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userId = req.user!.id;
            const cart = await this.cartService.clearCartItems(userId);
            handleSuccess(res, 200, 'Cleared cart successfully.', cart);
        } catch (error) {
            next(error);
        }
    }
}