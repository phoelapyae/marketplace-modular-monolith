import { CreateCategoryDto, UpdateCategoryDto } from "../dto/category.dto";
import Category from "../models/category.model";

export interface CategoryRepositoryInterface {
    findAll(): Promise<Category[]>;

    findById(id: number): Promise<Category | null>;

    findByName(name: string): Promise<Category | null>;

    create(categoryData: CreateCategoryDto): Promise<Category>;

    update(id: number, updateData: UpdateCategoryDto): Promise<Category | null>;

    delete(id: number): Promise<boolean>;
}