import type { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/errors.js";
import { logger } from "../config/logger.js";

export function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction
) {
  if (err instanceof AppError) {
    logger.warn(
      { code: err.code, statusCode: err.statusCode, path: req.path },
      err.message
    );

    res.status(err.statusCode).json({
      error: {
        code: err.code,
        message: err.message,
      },
    });
    return;
  }

  // Erreur non gérée : log complet (avec stack), réponse 500 générique
  logger.error({ err, path: req.path }, "Erreur non gérée");

  res.status(500).json({
    error: {
      code: "INTERNAL_ERROR",
      message: "Internal Server Error",
    },
  });
}