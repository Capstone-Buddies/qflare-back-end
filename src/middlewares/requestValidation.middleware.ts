import { ExpressRequestSchema } from "@/zod/schemas/expressRequest";
import { NextFunction, Request, RequestHandler, Response } from "express";
import { ZodIssue, ZodObject, ZodRawShape, z } from "zod";

export const requestValidationMiddleware = <
  TBody extends ZodRawShape = {},
  TQueryParams extends ZodRawShape = {},
  TParams extends ZodRawShape = {},
>(
  schema: ExpressRequestSchema<TBody, TQueryParams, TParams>,
) : RequestHandler<TParams, any, TBody, TQueryParams> => {
  return (
    req: Request<
      z.infer<ZodObject<TParams>>,
      any,
      z.infer<ZodObject<TBody>>,
      z.infer<ZodObject<TQueryParams>>
    >,
    res: Response,
    next: NextFunction,
  ) => {
    const { body, params, queryParams } = schema;

    let valid: boolean = true;
    let traces: { message: string; errors: ZodIssue[] }[] = [];

    if (body) {
      const result = body?.safeParse(req.body);
      if (result.success) {
        req.body = result.data;
      } else {
        valid = false;
        traces.push({
          message: "Invalid request body",
          errors: result.error.errors,
        });
      }
    }

    if (params) {
      const result = params.safeParse(req.params);
      if (result.success) {
        req.params = result.data;
      } else {
        valid = false;
        traces.push({
          message: "Invalid request params",
          errors: result.error.errors,
        });
      }
    }

    if (queryParams) {
      const result = queryParams.safeParse(req.query);
      if (result.success) {
        req.query = result.data;
      } else {
        valid = false;
        traces.push({
          message: "Invalid request query params",
          errors: result.error.errors,
        });
      }
    }

    if (!valid) {
      return res.status(400).json({
        status: "fail",
        message: "Invalid request",
        traces,
      });
    }

    return next();
  };
};
