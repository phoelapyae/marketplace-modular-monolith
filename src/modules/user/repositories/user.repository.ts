import { CreateUserDto, UpdateUserDto } from "../dto/user.dto";
import { UserRepositoryInterface } from "../interfaces/user.repository.interface";
import User from "../models/user.model";

export class UserRepository implements UserRepositoryInterface {
    async findAll(): Promise<User[]> {
        return User.findAll();
    }

    async findById(id: number): Promise<User | null> {
        return User.findByPk(id);
    }

    async findByEmail(email: string): Promise<User | null> {
        return User.findOne({ where: { email } });
    }

    async create(userData: CreateUserDto): Promise<User> {
        return User.create(userData as any);
    }

    async update(id: number, userData: UpdateUserDto): Promise<User | null> {
        const user = await User.findByPk(id);

        if (! user) {
            return null;
        }

        return user.update(userData);
    }

    async delete(id: number): Promise<boolean> {
        const deleted = await User.destroy({ where: { id } });
        return deleted > 0;
    }
}