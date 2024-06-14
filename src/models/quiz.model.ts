import { db } from "@/drizzle/db";
import { and, eq } from "drizzle-orm";
import {
  quizHistories,
  quizCategories,
  answerHistories,
  quizQuestions,
  AnswerHistoryType,
} from "@/drizzle/schema";

export const getCategoryId = async (quizCategory: string) => {
  const { categoryId } = (
    await db
      .select({ categoryId: quizCategories.id })
      .from(quizCategories)
      .where(eq(quizCategories.quizCategory, quizCategory))
      .limit(1)
  )[0];

  return categoryId;
};

export const createQuiz = async (
  userId: string,
  level: number,
  quizCategory: string,
) => {
  const timestamp = new Date();
  if (timestamp.getMilliseconds() >= 500) {
    timestamp.setSeconds(timestamp.getSeconds() + 1);
  }
  timestamp.setMilliseconds(0);

  const categoryId = await getCategoryId(quizCategory);

  await db.insert(quizHistories).values({
    userId: userId,
    timestamp: timestamp,
    grade: 0,
    level: level,
    quizCategoryId: categoryId,
  });

  const { quizHistoryId } = (
    await db
      .select({ quizHistoryId: quizHistories.id })
      .from(quizHistories)
      .where(
        and(
          eq(quizHistories.userId, userId),
          eq(quizHistories.timestamp, timestamp),
        ),
      )
      .limit(1)
  )[0];

  return quizHistoryId;
};

export const reviewUserQuiz = async (
  quizHistoryId: number,
  summary: { questionId: number; userAnswer: number; duration: number }[],
) => {
  const correctAnswers = await db
    .select({
      questionId: quizQuestions.id,
      correctAnswer: quizQuestions.answer,
    })
    .from(quizQuestions)
    .innerJoin(
      answerHistories,
      eq(quizQuestions.id, answerHistories.questionId),
    )
    .where(eq(answerHistories.quizHistoryId, quizHistoryId));

  const correctAnswersMap = new Map<number, number>(
    correctAnswers.map((item) => [item.questionId, item.correctAnswer]),
  );

  let grade = 0;

  for (const { userAnswer, duration } of summary) {
    const correctness =
      userAnswer === correctAnswersMap.get(userAnswer) ? 1 : 0;

    grade += correctness;

    await db.update(answerHistories).set({
      userAnswer,
      correctness,
      duration,
    });
  }

  return grade;
};

export const insertQuizAnswerBatch = async (answers: AnswerHistoryType[]) => {
  for (const answer of answers) {
    await db.insert(answerHistories).values(answer);
  }
};

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

export const getUserQuizHistoryAnswers = async (
  quizHistoryId: number,
  // NOTE: does this param needed anyway?
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
        eq(answerHistories.quizHistoryId, quizHistoryId),
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
