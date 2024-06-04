import { z, ZodObject, ZodRawShape, ZodTypeAny } from "zod";

export class ExpressRequestSchema<
  TBody extends ZodRawShape = ZodRawShape,
  TQueryParams extends ZodRawShape = ZodRawShape,
  TParams extends ZodRawShape = ZodRawShape,
> {
  body?: ZodObject<
    TBody,
    "strip",
    ZodTypeAny,
    z.infer<ZodObject<TBody>>,
    z.infer<ZodObject<TBody>>
  >;
  queryParams?: ZodObject<
    TQueryParams,
    "strip",
    ZodTypeAny,
    z.infer<ZodObject<TQueryParams>>,
    z.infer<ZodObject<TQueryParams>>
  >;
  params?: ZodObject<
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
    bodySchema?: ZodObject<TBody, "strip">;
    queryParamsSchema?: ZodObject<TQueryParams, "strip">;
    paramsSchema?: ZodObject<TParams, "strip">;
  }) {
    if (bodySchema) this.body = bodySchema;
    if (queryParamsSchema) this.queryParams = queryParamsSchema;
    if (paramsSchema) this.params = paramsSchema;
  }
}
