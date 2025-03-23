import { NextFunction, Request, Response } from "express";
import { ProductService } from "../services/product.service";
import { handleSuccess } from "../../../common/resources/handler";

export class ProductController {
    private productService: ProductService;

    constructor() {
        this.productService = new ProductService();
    }

    getAllProducts = async(req: Request, res: Response, next: NextFunction) => {
        try {
            const products = await this.productService.getAllProducts();
            handleSuccess(res, 200, 'Retrieved products successfully.', products);
        } catch (error) {
            next(error);
        }
    }

    getProductById = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = parseInt(req.params.id, 10);
            const product = await this.productService.getProductById(id);
            handleSuccess(res, 200, 'Retrieved product successfully.', product);
        } catch (error) {
            next(error);
        }
    }

    getProductsBySellerId = async(req: Request, res: Response, next: NextFunction) => {
        try {
            const id = parseInt(req.params.id, 10);
            const products = await this.productService.getProductsBySellerId(id);
            handleSuccess(res, 200, 'Retrieved products successfully.', products);
        } catch (error) {
            next(error);
        }
    }

    getProductsByCategory = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const category = req.params.category;
            const products = await this.productService.getProductsByCategory(category);
            handleSuccess(res, 200, 'Retrieved products successfully.', products);
        } catch (error) {
            next(error);
        }
    }
}