import { NextFunction, Request, Response } from "express";
import { initiateManagement } from "../utils/management";

export const managementMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  await initiateManagement();
  next();
};
