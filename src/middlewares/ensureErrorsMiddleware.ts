import { NextFunction, Request, Response } from "express";
import { CustomErrors } from "../Errors/CustomErrors";


export function ErrorsMiddleware(err: CustomErrors | Error, request: Request, response: Response, next: NextFunction) {
    if (err instanceof CustomErrors) {
        return response.status(err.statusCode).json({ error: err.message })
    }

    return response.status(500).json({
        status: "error",
        message: "Internal server error",
        description: err.message
    })
}