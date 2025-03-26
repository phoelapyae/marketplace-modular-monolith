import { NextFunction, Request, Response } from "express";
import { CategoryService } from "../services/category.service";
import { handleSuccess } from "../../../common/resources/handler";
import { CreateCategoryDto, UpdateCategoryDto } from "../dto/category.dto";

export class CategoryController {
    private categoryService: CategoryService;

    constructor() {
        this.categoryService = new CategoryService();
    }

    getAllCategories = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const categories = await this.categoryService.getAllCategories();
            handleSuccess(res, 200, 'Retrieved categories successfully.', categories);
        } catch (error) {
            next(error);
        }
    }

    getCategoryById = async(req: Request, res: Response, next: NextFunction) => {
        try {
            const id = parseInt(req.params.id, 10);
            const category = await this.categoryService.getCategoryById(id);
            handleSuccess(res, 200, 'Retrieved category successfully.', category);
        } catch (error) {
            next(error);
        }
    }

    createCategory = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const categoryData: CreateCategoryDto = req.body;
            const newCategory = await this.categoryService.createCategory(categoryData);
            handleSuccess(res, 201, 'Created new category successfully.', newCategory);
        } catch (error) {
            next(error);
        }
    }

    updateCategory = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = parseInt(req.params.id, 10);
            const categoryData: UpdateCategoryDto = req.body;
            const updateCategory = await this.categoryService.updateCategory(id, categoryData);
            handleSuccess(res, 200, 'Updated category successfully.', updateCategory);
        } catch (error) {
            next(error);
        }
    }

    deleteCategory = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = parseInt(req.params.id, 10);
            const deleted = await this.categoryService.deleteCategory(id);
            handleSuccess(res, 204, 'Deleted category successfully.', deleted);
        } catch (error) {
            next(error);
        }
    }
}