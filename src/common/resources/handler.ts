import { Response } from "express";

export const handleSuccess = (
    res: Response,
    code: number,
    message: string,
    data: any | null
) => {

    let response = null;
    
    if (data) {
        response = { code, message, data };
    }
    else {
        response = { code, message };
    }

    res.status(code).json(response);
}