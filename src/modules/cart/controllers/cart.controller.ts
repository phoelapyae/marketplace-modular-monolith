import { NextFunction, Request, Response } from "express";
import { CartService } from "../services/cart.service";
import { handleSuccess } from "../../../common/resources/handler";

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
}