import { Request, Response, NextFunction } from "express";
import * as passport from "passport";

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate('jwt', (err, user, info) => {
    if (user) {
      next();
    } else {
      const msg = info.name === 'TokenExpiredError' ? 'token已过期' : 'token不存在';
      responseData(401, res, -1, msg);
    }
  })(req, res, next);
};

export const responseData = (statusCode: number, res: Response, code: number, msg: string, data?: any) =>
  res.status(statusCode).json
  ({
    code,
    msg,
    data,
  });
