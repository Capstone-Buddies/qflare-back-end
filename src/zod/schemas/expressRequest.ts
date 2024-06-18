import { Request } from "express";
import { z, ZodObject, ZodRawShape, ZodTypeAny } from "zod";
import { AuthenticatedRequest } from "../../middlewares/auth.middleware";

export class ExpressRequestSchema<
  TBody extends ZodRawShape = ZodRawShape,
  TQueryParams extends ZodRawShape = ZodRawShape,
  TParams extends ZodRawShape = ZodRawShape,
> {
  body: ZodObject<
    TBody,
    "strip",
    ZodTypeAny,
    z.infer<ZodObject<TBody>>,
    z.infer<ZodObject<TBody>>
  >;
  queryParams: ZodObject<
    TQueryParams,
    "strip",
    ZodTypeAny,
    z.infer<ZodObject<TQueryParams>>,
    z.infer<ZodObject<TQueryParams>>
  >;
  params: ZodObject<
    TParams,
    "strip",
    ZodTypeAny,
    z.infer<ZodObject<TParams>>,
    z.infer<ZodObject<TParams>>
  >;

  constructor({
    bodySchema,
    queryParamsSchema,
    paramsSchema,
  }: {
    bodySchema: ZodObject<TBody, "strip">;
    queryParamsSchema: ZodObject<TQueryParams, "strip">;
    paramsSchema: ZodObject<TParams, "strip">;
  }) {
    this.body = bodySchema;
    this.queryParams = queryParamsSchema;
    this.params = paramsSchema;
  }
}

export type TypedRequest<T extends ExpressRequestSchema> = Request<
  z.infer<T["params"]>,
  any,
  z.infer<T["body"]>,
  z.infer<T["queryParams"]>
>;

export type AuthenticatedTypedRequest<T extends ExpressRequestSchema> =
  AuthenticatedRequest<
    z.infer<T["params"]>,
    any,
    z.infer<T["body"]>,
    z.infer<T["queryParams"]>
  >;
