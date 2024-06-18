// quiz.controller
import { status } from "@/constants";
import { db } from "@/drizzle/db";
import { AnswerHistoryType, quizQuestions } from "@/drizzle/schema";
import { AuthenticatedRequest } from "@/middlewares/auth.middleware";
import {
  createQuiz,
  getQuizExp,
  getQuizRecommendation,
  getUserQuizHistories,
  getUserQuizHistoryAnswers,
  insertQuizAnswerBatch,
  reviewUserQuiz,
} from "@/models/quiz.model";
import { updateUserStats } from "@/models/user.model";
import {
  CalculateQuizRequest,
  GenerateQuizRequest,
  GetQuizAnswersRequest,
} from "@/zod/schemas/quizRoute";
import { Response } from "express";

export const generateQuiz = async (req: GenerateQuizRequest, res: Response) => {
  // TODO: Implement generateQuiz
  // TODO: This is dummy implementation, replace it with real implementation later

  const { quizCategory } = req.body;
  const { id: userId, level } = req.user!;
  try {
    const questions = await getQuizRecommendation(userId, quizCategory);

    const quizHistoryId = await createQuiz(
      userId,
      level === null ? 1 : level,
      quizCategory,
    );

    // TODO: Implement real answer insertion
    const baseAnswers: AnswerHistoryType[] = questions.map((question) => {
      return {
        quizHistoryId,
        questionId: question.id,
        userAnswer: null,
        correctness: 0,
        duration: 60,
      };
    });

    await insertQuizAnswerBatch(baseAnswers);

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
    console.log(error);
    return res.status(500).json({
      status: status.fail,
      message: "An error occurred while generating quiz",
    });
  }
};

export const calculateQuiz = async (
  req: CalculateQuizRequest,
  res: Response,
) => {
  // TODO: Implement caculateQuiz
  // TODO: This is dummy implementation, replace it with real implementation later
  const { quizId, answers } = req.body;

  const userId = req.user!.id;
  const userLevel = req.user!.level as number;
  const userExp = req.user!.exp as number;

  try {
    const { grade, detailResult } = await reviewUserQuiz(quizId, answers);

    const expGain = await getQuizExp(detailResult);
    let newExp = userExp + expGain;
    const newLevel = userLevel + (newExp > 1000 ? 1 : 0);
    newExp = newExp > 1000 ? newExp - 1000 : newExp;

    await updateUserStats(userId, newLevel, newExp);

    return res
      .json({
        status: status.success,
        message: "This endpoint has not implemented yet",
        data: {
          // TODO: review if all these data are needed
          grade,
          expGain,
          newLevel,
          newExp,
        },
      })
      .status(200);
  } catch (error) {
    return res.status(500).json({
      status: status.fail,
      message: "An error occurred while calculating quiz",
    });
  }
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
    const answers = await getUserQuizHistoryAnswers(historyId, userId);
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
