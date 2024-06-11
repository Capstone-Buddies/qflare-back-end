import { db } from "@/drizzle/db";
import { and, eq } from "drizzle-orm";
import {
  quizHistories,
  quizCategories,
  answerHistories,
  quizQuestions,
} from "@/drizzle/schema";

export const getUserQuizHistories = async (userId: string) => {
  try {
    const histories = await db
      .select({
        id: quizHistories.id,
        timestamp: quizHistories.timestamp,
        grade: quizHistories.grade,
        level: quizHistories.level,
        quizCategory: quizCategories.quizCategory,
      })
      .from(quizHistories)
      .innerJoin(
        quizCategories,
        eq(quizHistories.quizCategoryId, quizCategories.id),
      )
      .where(eq(quizHistories.userId, userId));

    return histories;
  } catch (error) {
    console.error("Error fetching quiz histories from database:", error);
    throw new Error("Database query failed");
  }
};

export const getQuizHistoryAnswers = async (
  historyId: number,
  userId: string,
) => {
  const history = await db
    .select({
      question: quizQuestions.question,
      option1: quizQuestions.option1,
      option2: quizQuestions.option2,
      option3: quizQuestions.option3,
      option4: quizQuestions.option4,
      userAnswer: answerHistories.userAnswer,
      correctness: answerHistories.correctness,
      duration: answerHistories.duration,
    })
    .from(answerHistories)
    .innerJoin(quizQuestions, eq(quizQuestions.id, answerHistories.questionId))
    .innerJoin(
      quizHistories,
      eq(answerHistories.quizHistoryId, quizHistories.id),
    )
    .where(
      and(
        eq(answerHistories.quizHistoryId, historyId),
        eq(quizHistories.userId, userId),
      ),
    );

  return history.map(({ correctness, ...rest }) => {
    return {
      ...rest,
      correctness: correctness === 1 ? true : false,
    };
  });
};
