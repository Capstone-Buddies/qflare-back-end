import {
  calculateQuiz,
  generateQuiz,
  getQuizAnswers,
  getQuizesHistories,
} from "@/controllers/quiz.controller";
import express from "express";

const quizRouter = express.Router();

quizRouter.post("/generate", generateQuiz);
quizRouter.post("/result", calculateQuiz);
quizRouter.get("/histories", getQuizesHistories);
quizRouter.get("/histories/:historyId/answers", getQuizAnswers);

export default quizRouter;
