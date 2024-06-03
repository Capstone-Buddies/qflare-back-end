import {
  calculateQuiz,
  generateQuiz,
  getQuizAnswers,
  getQuizesHistories,
} from "@/controllers/quiz.controller";
import authMiddleware from "@/middlewares/auth.middleware";
import express from "express";

const quizRouter = express.Router();

quizRouter.post("/", authMiddleware, generateQuiz);
quizRouter.post("/result", authMiddleware, calculateQuiz);
quizRouter.get("/histories", authMiddleware, getQuizesHistories);
quizRouter.get("/histories/:historyId/answers", authMiddleware, getQuizAnswers);

export default quizRouter;
