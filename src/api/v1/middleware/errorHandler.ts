import { Request, Response, NextFunction } from "express";
export const errorHandler = (err: any, _req: Request, res: Response, _next: NextFunction): void => {
  console.error("Error:", err);

  res.status(err.status || 500).json({
    message: err.message || "Internal Server Error"
  });
};