import { NextFunction, Request, Response } from "express";

export const shopOwnershipMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const shopId = parseInt(req.body.shopId, 10);

        if (!shopId) {
            next();
        }

    } catch (error) {
        next(error);
    }
}