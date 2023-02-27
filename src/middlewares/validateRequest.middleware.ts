import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
import RequestValidator from "@/interfaces/RequestValidators.interface";

export function validateRequest(validators: RequestValidator) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (validators.params) {
        req.params = await validators.params.parseAsync(req.params);
      }
      if (validators.body) {
        req.body = await validators.body.parseAsync(req.body);
      }
      if (validators.query) {
        req.query = await validators.query.parseAsync(req.query);
      }
      next();
    } catch (error) {
      console.log("---->" + typeof error.message);
      if (error instanceof ZodError) {
        res.status(422);
      }
      next(error);
    }
  };
}
