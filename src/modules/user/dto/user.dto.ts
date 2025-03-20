export interface CreateUserDto {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role?: 'user' | 'seller' | 'admin',
    address?: string,
    phone?: string
}

export interface UpdateUserDto {
    firstName?: string;
    lastName?: string;
    email?: string;
    address?: string;
    phone?: string;
}

export interface UserResponseDto {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    role: string;
    address?: string;
    phone?: string;
    createdAt: Date,
    updatedAt: Date
}