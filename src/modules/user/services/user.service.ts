import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { enviroment } from '../../../config/enviroment';
import { UserRepositoryInterface } from '../interfaces/user.repository.interface';
import { UserRepository } from '../repositories/user.repository';
import { CreateUserDto, UpdateUserDto, UserResponseDto } from '../dto/user.dto';
import { HttpException } from '../../../common/middleware/error.middleware';
import { TokenPayload } from '../../../common/middleware/auth.middleware';

export class UserService {
  private userRepository: UserRepositoryInterface;

  constructor() {
    this.userRepository = new UserRepository();
  }

  async getAllUsers(): Promise<UserResponseDto[]> {
    const users = await this.userRepository.findAll();
    return users.map(this.mapUserToDto);
  }

  async getUserById(id: number): Promise<UserResponseDto> {
    const user = await this.userRepository.findById(id);
    
    if (!user) {
      throw new HttpException(404, 'User not found');
    }
    
    return this.mapUserToDto(user);
  }

  async createUser(userData: CreateUserDto): Promise<UserResponseDto> {
    const existingUser = await this.userRepository.findByEmail(userData.email);
    
    if (existingUser) {
      throw new HttpException(409, 'User with this email already exists');
    }
    
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const user = await this.userRepository.create({
      ...userData,
      password: hashedPassword,
    });
    
    return this.mapUserToDto(user);
  }

  async updateUser(id: number, userData: UpdateUserDto): Promise<UserResponseDto> {
    if (userData.email) {
      const existingUser = await this.userRepository.findByEmail(userData.email);
      
      if (existingUser && existingUser.id !== id) {
        throw new HttpException(409, 'Email already in use');
      }
    }
    
    const user = await this.userRepository.update(id, userData);
    
    if (!user) {
      throw new HttpException(404, 'User not found');
    }
    
    return this.mapUserToDto(user);
  }

  async deleteUser(id: number): Promise<boolean> {
    const deleted = await this.userRepository.delete(id);
    
    if (!deleted) {
      throw new HttpException(404, 'User not found');
    }
    
    return deleted;
  }

  async login(email: string, password: string): Promise<{ token: string; user: UserResponseDto }> {
    const user = await this.userRepository.findByEmail(email);
    
    if (!user) {
      throw new HttpException(401, 'Invalid credentials');
    }
    
    const isPasswordValid = await bcrypt.compare(password, user.password);
    
    if (!isPasswordValid) {
      throw new HttpException(401, 'Invalid credentials');
    }
    
    const tokenPayload: TokenPayload = {
      id: user.id,
      email: user.email,
      role: user.role,
    };
    
    const token = jwt.sign(tokenPayload, enviroment.jwtSecret, {
      expiresIn: 60000,
    });
    
    return {
      token,
      user: this.mapUserToDto(user),
    };
  }

  private mapUserToDto(user: any): UserResponseDto {
    return {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
      address: user.address,
      phone: user.phone,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }
}