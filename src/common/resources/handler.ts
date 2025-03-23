import { Response } from "express";

export const handleSuccess = (
    res: Response,
    code: number,
    message: string,
    data: any | null
) => {
    let response = data ? { code, message, data } : { code, message };

    res.status(code).json(response);
}