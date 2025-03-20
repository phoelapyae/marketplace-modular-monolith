import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { enviroment } from "../../config/enviroment";
import { HttpException } from "./error.middleware";

export interface TokenPayload {
    id: number;
    email: string;
    role: string;
}

declare global {
    namespace Express {
        interface Request {
            user?: TokenPayload
        }
    }
}

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        
        if (!token) {
            throw new HttpException(401, 'Authentication token missing.');
        }

        const decoded = jwt.verify(token, enviroment.jwtSecret) as TokenPayload;
        req.user = decoded;

        next();
    } catch (error) {
        next(new HttpException(401, 'Invalid or expired token.'));
    }
}