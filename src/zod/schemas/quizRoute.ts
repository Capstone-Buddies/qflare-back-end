import { number, z } from "zod";
import { validCategories } from "../../constants";
import {
  AuthenticatedTypedRequest,
  ExpressRequestSchema,
} from "./expressRequest";

export const generateQuizSchema = new ExpressRequestSchema({
  paramsSchema: z.object({}),
  bodySchema: z.object({
    quizCategory: z.string().refine(
      (value) => {
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
    quizId: number().int(),
    answers: z.array(
      z.object({
        questionId: z.number().int(),
        userAnswer: z
          .number()
          .int()
          .refine((answer) => answer > 0 && answer < 5, {
            message: "Answer must be between 1 and 4",
          }),
        duration: z.number().int(),
      }),
    ),
  }),
  queryParamsSchema: z.object({}),
});

export type CalculateQuizRequest = AuthenticatedTypedRequest<
  typeof calculateQuizSchema
>;

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
