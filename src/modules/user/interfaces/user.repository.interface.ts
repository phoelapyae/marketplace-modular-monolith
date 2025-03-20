import { CreateUserDto, UpdateUserDto } from "../dto/user.dto";
import { User } from "../models/user.model";

export interface UserRepositoryInterface {
    findAll(): Promise<User[]>;
    findById(id: number): Promise<User | null>;
    findByEmail(email: string): Promise<User | null>;
    create(userData: CreateUserDto): Promise<User>;
    update(id: number, userData: UpdateUserDto): Promise<User | null>;
    delete(id: number): Promise<boolean>
}