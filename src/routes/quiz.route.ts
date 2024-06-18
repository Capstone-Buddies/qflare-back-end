import {
  calculateQuiz,
  generateQuiz,
  getQuizAnswers,
  getQuizHistories,
} from "@/controllers/quiz.controller";
import authMiddleware from "@/middlewares/auth.middleware";
import { requestValidationMiddleware } from "@/middlewares/requestValidation.middleware";
import { generateQuizSchema, getQuizAnswersSchema } from "@/zod/schemas/quizRoute";
import express from "express";

const quizRouter = express.Router();

quizRouter.use(authMiddleware);

quizRouter.post("/", requestValidationMiddleware(generateQuizSchema), generateQuiz);
quizRouter.post("/result", calculateQuiz);
quizRouter.get("/histories", getQuizHistories);
quizRouter.get(
  "/histories/:historyId/answers",
  requestValidationMiddleware(getQuizAnswersSchema),
  getQuizAnswers,
);

export default quizRouter;

