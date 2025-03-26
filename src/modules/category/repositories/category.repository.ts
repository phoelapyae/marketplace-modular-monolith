import { HttpException } from "../../../common/middleware/error.middleware";
import { CreateCategoryDto, UpdateCategoryDto } from "../dto/category.dto";
import { CategoryRepositoryInterface } from "../interfaces/category.repository.interface";
import Category from "../models/category.model";

export class CategoryRepository implements CategoryRepositoryInterface {
    async findAll(): Promise<Category[]> {
        return Category.findAll();
    }

    async findById(id: number): Promise<Category | null> {
        return Category.findByPk(id);
    }

    async findByName(name: string): Promise<Category | null> {
        return Category.findOne({ where: { name } });
    }

    async create(categoryData: CreateCategoryDto): Promise<Category> {
        return Category.create(categoryData as any);
    }

    async update(id: number, categoryData: UpdateCategoryDto): Promise<Category | null> {
        const category = await Category.findByPk(id);

        if (!category) {
            throw new HttpException(404, 'Category not found.')
        }

        return category.update(categoryData);
    }

    async delete(id: number): Promise<boolean> {
        const deleted = await Category.destroy({where: {id}});
        return deleted > 0;
    }
}