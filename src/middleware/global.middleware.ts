import type { NextFunction, Request, Response } from "express";

export const globalMiddleware = (req: Request, res: Response, next: NextFunction) => {
    console.log("Middleware Global");
    next();
}