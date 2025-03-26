import { NextFunction, Request, Response } from "express";
import { ProductService } from "../services/product.service";
import { handleSuccess } from "../../../common/resources/handler";
import { UpdateProductDto } from "../dto/product.dto";

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
            const sellerId = parseInt(req.params.sellerId, 10);
            const products = await this.productService.getProductsBySellerId(sellerId);
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

    getProdctsByShopId = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const shopId = parseInt(req.params.shopId, 10);
            const products = await this.productService.getProductsByShopId(shopId);
            handleSuccess(res, 200, 'Retrieved products successfuflly.', products);
        } catch (error) {
            next(error);
        }
    }

    createProduct = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const productData = {
                ...req.body,
                sellerId: req.user!.id,
            }

            console.log("Product Data ", productData);

            const newProduct = await this.productService.createProduct(productData);

            handleSuccess(res, 201, 'Created product successfully.', newProduct);
        } catch (error) {
            next(error);
        }
    }

    updateProduct = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = parseInt(req.params.id, 10);
            const productData: UpdateProductDto = req.body
            const updateProduct = await this.productService.updateProduct(id, req.user!.id, productData);
            handleSuccess(res, 200, 'Updated product successfully.', updateProduct);
        } catch (error) {
            next(error);
        }
    }

    deleteProduct = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = parseInt(req.params.id, 10);
            await this.productService.deleteProduct(id, req.user!.id);
            handleSuccess(res, 204, 'Deleted product successfully', null);
        } catch (error) {
            next(error);
        }
    }
}