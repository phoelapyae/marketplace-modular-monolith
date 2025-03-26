import { HttpException } from "../../../common/middleware/error.middleware";
import { CategoryResponseDto, CreateCategoryDto, UpdateCategoryDto } from "../dto/category.dto";
import { CategoryRepositoryInterface } from "../interfaces/category.repository.interface";
import { CategoryRepository } from "../repositories/category.repository";

export class CategoryService {
    private categoryRepository: CategoryRepositoryInterface;

    private mapCategoryToDto(category: any): CategoryResponseDto {
        return {
            id: category.id,
            name: category.name,
            description: category.description,
            createdAt: category.createdAt,
            updatedAt: category.updatedAt
        }
    }

    constructor() {
        this.categoryRepository = new CategoryRepository();
    }

    async getAllCategories(): Promise<CategoryResponseDto[]> {
        const categories = await this.categoryRepository.findAll();
        return categories.map(this.mapCategoryToDto);
    }

    async getCategoryById(id: number): Promise<CategoryResponseDto> {
        const category = await this.categoryRepository.findById(id);

        if (!category) {
            throw new HttpException(404, 'Category not found.');
        }

        return this.mapCategoryToDto(category);
    }

    async createCategory(categoryData: CreateCategoryDto): Promise<CategoryResponseDto> {
        const existingCategory = await this.categoryRepository.findByName(categoryData.name);

        if (existingCategory) {
            throw new HttpException(409, 'Category already exists.');
        }

        const category = await this.categoryRepository.create(categoryData);

        return this.mapCategoryToDto(category);
    }

    async updateCategory(id: number, categoryData: UpdateCategoryDto): Promise<CategoryResponseDto> {
        const existingCategory = await this.categoryRepository.findByName(categoryData.name);

        if (existingCategory && existingCategory.id !== id) {
            throw new HttpException(409, 'Category name already in use.');
        }

        const category = await this.categoryRepository.update(id, categoryData);

        if (!category) {
            throw new HttpException(404, 'Category not found.');
        }

        return this.mapCategoryToDto(category);
    }

    async deleteCategory(id: number): Promise<boolean> {
        const deleted = await this.categoryRepository.delete(id);

        if (!deleted) {
            throw new HttpException(404, 'Category not found.');
        }

        return deleted;
    }
}