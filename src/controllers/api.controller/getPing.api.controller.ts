import { NextFunction, Request, Response } from "express";
import { logger } from "../../config";

export function getPing(
  request: Request,
  response: Response,
  next: NextFunction
) {
  logger.debug("[GET getPing]");

  return response.status(200).json({
    status: 200,
    message: "Server Online",
  });
}
