import { NextFunction, Request, Response } from "express";
import { ErrorCode, HttpException } from "../exceptions/root.exception";

export const errorHandler = (
  method: (req: Request, res: Response, next: NextFunction) => Promise<any>
) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await method(req, res, next);
    } catch (error: any) {
      let exception: HttpException;
      if (error instanceof HttpException) {
        exception = error;
      } else {
        exception = new HttpException(
          "Something went wrong",
          ErrorCode.INTERNAL_EXCEPTION,
          500,
          error
        );
      }
      console.log(error)
      next(exception);
    }
  };
};
