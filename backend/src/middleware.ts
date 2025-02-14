import { NextFunction, Request, Response } from "express";
import jwt, { decode } from "jsonwebtoken";

export const userMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const header = req.headers["authorization"];
  const decoded = jwt.verify(header as string, process.env.JWT_SECRET!);

  if (decoded) {
    // @ts-ignore
    req.userId = decode.userId;
    next();
  } else {
    res.status(403).json({
      success: false,
      message: "You are not logged in ",
    });
    return;
  }
};
