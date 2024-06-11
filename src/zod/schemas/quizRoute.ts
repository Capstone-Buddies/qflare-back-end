import { z } from "zod";
import { ExpressRequestSchema, TypedRequest } from "./expressRequest";

export const getQuizAnswersSchema = new ExpressRequestSchema({
  paramsSchema: z.object({
    historyId: z.string(),
  }),
  bodySchema: z.object({}),
  queryParamsSchema: z.object({}),
});

export type GetQuizAnswersRequest = TypedRequest<typeof getQuizAnswersSchema>;
