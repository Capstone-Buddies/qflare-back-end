import { number, z } from "zod";
import {
  AuthenticatedTypedRequest,
  ExpressRequestSchema,
} from "./expressRequest";

export const generateQuizSchema = new ExpressRequestSchema({
  paramsSchema: z.object({}),
  bodySchema: z.object({
    quizCategory: z.string().refine(
      (value) => {
        const validCategories = ["TPS", "Literasi"];

        return validCategories.includes(value);
      },
      {
        message: "Invalid quiz category",
      },
    ),
  }),
  queryParamsSchema: z.object({}),
});

export type GenerateQuizRequest = AuthenticatedTypedRequest<
  typeof generateQuizSchema
>;

export const calculateQuizSchema = new ExpressRequestSchema({
  paramsSchema: z.object({}),
  bodySchema: z.object({
    quizId: number(),
    answers: z.array(z.object({ questionId: z.string(), answer: z.string() })),
  }),
  queryParamsSchema: z.object({}),
});

export const getQuizAnswersSchema = new ExpressRequestSchema({
  paramsSchema: z.object({
    historyId: z.string(),
  }),
  bodySchema: z.object({}),
  queryParamsSchema: z.object({}),
});

export type GetQuizAnswersRequest = AuthenticatedTypedRequest<
  typeof getQuizAnswersSchema
>;
