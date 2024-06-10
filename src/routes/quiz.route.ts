import {
  calculateQuiz,
  generateQuiz,
  getQuizAnswers,
  getQuizHistories,
} from "@/controllers/quiz.controller";
import authMiddleware from "@/middlewares/auth.middleware";
import express from "express";

const quizRouter = express.Router();

quizRouter.use(authMiddleware);

quizRouter.post("/", generateQuiz);
quizRouter.post("/result", calculateQuiz);
quizRouter.get("/histories", authMiddleware, getQuizHistories);
quizRouter.get("/histories/:historyId/answers", getQuizAnswers);

export default quizRouter;
