import { NextFunction, Response } from "express";
import { ZodRawShape } from "zod";
import { AuthenticatedRequest } from "./auth.middleware";
import {
  ExpressRequestSchema,
  TypedRequest,
} from "../zod/schemas/expressRequest";

export const requestValidationMiddleware = <
  TBody extends ZodRawShape = {},
  TQueryParams extends ZodRawShape = {},
  TParams extends ZodRawShape = {},
>(
  schema: ExpressRequestSchema<TBody, TQueryParams, TParams>,
) => {
  return (
    req: TypedRequest<typeof schema> & AuthenticatedRequest,
    res: Response,
    next: NextFunction,
  ) => {
    const { body, params, queryParams } = schema;

    let valid: boolean = true;
    let traces: {
      message: string;
      errors: { message: string; property: string }[];
    }[] = [];

    if (body) {
      const result = body?.safeParse(req.body);
      if (result.success) {
        req.body = result.data;
      } else {
        valid = false;
        traces.push({
          message: "Invalid request body",
          errors: result.error.errors.map(({ path, message }) => {
            return {
              property: path.join("."),
              message,
            };
          }),
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
          errors: result.error.errors.map(({ path, message }) => {
            return {
              property: path.join("."),
              message,
            };
          }),
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
          errors: result.error.errors.map(({ path, message }) => {
            return {
              property: path.join("."),
              message,
            };
          }),
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
