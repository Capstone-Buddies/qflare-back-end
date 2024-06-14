// quiz.controller
import { status } from "@/constants";
import { db } from "@/drizzle/db";
import { AnswerHistoryType, quizQuestions } from "@/drizzle/schema";
import { AuthenticatedRequest } from "@/middlewares/auth.middleware";
import {
  createQuiz,
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
    // TODO: Implement real quiz selection
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

    // TODO: Implement real answer insertion
    const basAnswers: AnswerHistoryType[] = questions.map((question) => {
      return {
        quizHistoryId,
        questionId: question.id,
        userAnswer: null,
        correctness: 0,
        duration: 60,
      };
    });

    await insertQuizAnswerBatch(basAnswers);

    return res
      .json({
        status: status.success,
        message: "Successfully generated quiz",
        data: {
          quizId: quizHistoryId,
          questions: questions.map((q) => {
            return {
              id: q.id,
              question: q.question,
              option1: q.option1,
              option2: q.option2,
              option3: q.option3,
              option4: q.option4,
            };
          }),
        },
      })
      .status(200);
  } catch (error) {
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

  const quizGrade = await reviewUserQuiz(quizId, answers);

  const expGain = (quizGrade / 100.0) * 500;
  let newExp = userExp + expGain;
  const newLevel = userLevel + (newExp > 1000 ? userLevel + 1 : userLevel);
  newExp = newExp > 1000 ? newExp - 1000 : newExp;

  await updateUserStats(userId, newLevel, newExp);

  return res
    .json({
      status: status.success,
      message: "This endpoint has not implemented yet",
      data: {
        // TODO: review if all these data are needed
        grade: quizGrade,
        expGain,
        newLevel,
        newExp,
      },
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
