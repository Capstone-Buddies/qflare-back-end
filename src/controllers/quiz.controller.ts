// quiz.controller
import { status } from "@/constants";
import { db } from "@/drizzle/db";
import {
  answerHistories,
  quizQuestions
} from "@/drizzle/schema";
import { AuthenticatedRequest } from "@/middlewares/auth.middleware";
import {
  createQuiz,
  getCategoryId,
  getQuizHistoryAnswers,
  getUserQuizHistories,
} from "@/models/quiz.model";
import {
  GenerateQuizRequest,
  GetQuizAnswersRequest,
} from "@/zod/schemas/quizRoute";
import { Request, Response } from "express";

export const generateQuiz = async (req: GenerateQuizRequest, res: Response) => {
  // TODO: Implement generateQuiz
  // TODO: This is dummy implementation, replace it with real implementation later

  const { quizCategory } = req.body;
  const { id: userId, level } = req.user!;
  try {
    const questions = (await db.select().from(quizQuestions)).filter(
      (q) =>
        (quizCategory === "TPS" && q.id <= 10) ||
        (quizCategory === "Literasi" && q.id > 10),
    );

    const quizHistoryId = await createQuiz(
      userId,
      level === null ? 1 : level,
      quizCategory,
    );

    for (const question of questions) {
      await db.insert(answerHistories).values({
        quizHistoryId: quizHistoryId,
        questionId: question.id,

        // Randomize user answer
        userAnswer: Math.floor(Math.random() * (4 - 1 + 1)) + 1,

        // Randomize correctness
        correctness: 0,

        // Randomize duration
        duration: Math.floor(Math.random() * (60 - 1 + 1)) + 1,
      });
    }

    return res
      .json({
        status: status.success,
        message: "Successfully generated quiz",
        data: {
          quizId: quizHistoryId,
          questions,
        },
      })
      .status(200);
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      status: status.fail,
      message: "An error occurred while generating quiz",
    });
  }
};

export const calculateQuiz = async (req: Request, res: Response) => {
  // TODO: Implement caculateQuiz
  return res
    .json({
      status: status.success,
      message: "This endpoint has not implemented yet",
    })
    .status(200);
};

export const getQuizHistories = async (
  req: AuthenticatedRequest,
  res: Response,
) => {
  try {
    const userId = req.user!.id;

    const histories = await getUserQuizHistories(userId);

    if (histories.length === 0) {
      return res.status(200).json({
        status: status.success,
        message: "User has no quiz histories",
      });
    }

    return res.status(200).json({
      status: status.success,
      data: { histories },
      message: "Successfully retrieved quiz histories",
    });
  } catch (error) {
    return res.status(500).json({
      status: status.fail,
      message: "An error occurred while load quiz histories",
    });
  }
};

export const getQuizAnswers = async (
  req: GetQuizAnswersRequest,
  res: Response,
) => {
  const userId = req.user!.id;
  const historyId: number = parseInt(req.params.historyId);

  try {
    const answers = await getQuizHistoryAnswers(historyId, userId);
    return res.status(200).json({
      status: status.success,
      data: { answers },
      message: "Successfully retrieved quiz answers",
    });
  } catch (error) {
    return res.status(500).json({
      status: status.fail,
      message: "An error occurred while load quiz answers",
    });
  }
};
