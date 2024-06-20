import { SQL, and, eq, sql } from "drizzle-orm";
import { db } from "../drizzle/db";
import {
  AnswerHistoryType,
  answerHistories,
  quizCategories,
  quizHistories,
  quizQuestions,
} from "../drizzle/schema";

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
  answerRecord: { questionId: number; userAnswer: number; duration: number }[],
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

  let grade: number = 0;
  let detailResult: {
    questionId: number;
    userAnswer: number;
    duration: number;
    correctness: number;
  }[] = [];

  for (const { questionId, userAnswer, duration } of answerRecord) {
    const correctness =
      userAnswer === correctAnswersMap.get(questionId) ? 1 : 0;

    detailResult.push({
      questionId,
      userAnswer,
      duration,
      correctness,
    });

    grade += correctness;

    await db
      .update(answerHistories)
      .set({
        userAnswer,
        correctness,
        duration,
      })
      .where(
        and(
          eq(answerHistories.quizHistoryId, quizHistoryId),
          eq(answerHistories.questionId, questionId),
        ),
      );
  }

  return { grade: grade * 10, detailResult };
};

export const updateQuizHistory = async (
  quizHistoryId: number,
  value: { grade: number },
) => {
  const { grade } = value;

  await db
    .update(quizHistories)
    .set({ grade })
    .where(eq(quizHistories.id, quizHistoryId));
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

export const getQuizRecommendation = async (
  userId: string,
  quizCategory: string,
) => {
  const x = quizCategory === "TPS" ? 1 : 601;
  const y = quizCategory === "TPS" ? 600 : 1000;
  let questionIds: number[] = Array.from(
    { length: 10 },
    () => Math.floor(Math.random() * (y - x + 1)) + x,
  );
  console.log("questionIds", questionIds);

  try {
    const recommendedQuestionId = await fetch(
      `${process.env.ML_API_BASE_URL}/recommendation`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, quizCategory: quizCategory }),
      },
    );

    type response = {
      status: string;
      data: {
        questions: number[];
      };
    };

    const {
      data: { questions },
    } = (await recommendedQuestionId.json()) as response;

    if (questions.length === 10) {
      questionIds = questions;
    }
  } catch (error) {
    console.log(error);
  }

  const whereClause: SQL[] = questionIds.map((questionId, index) => {
    if (index === questionIds.length - 1) {
      return sql`id = ${questionId}`;
    }

    return sql`id = ${questionId} OR`;
  });

  const recommendedQuestions = await db
    .select({
      id: quizQuestions.id,
      question: quizQuestions.question,
      option1: quizQuestions.option1,
      option2: quizQuestions.option2,
      option3: quizQuestions.option3,
      option4: quizQuestions.option4,
    })
    .from(quizQuestions)
    .where(sql.join(whereClause, sql.raw(" ")));

  console.log("questionIds", questionIds);
  console.log(
    "recommendedQuestions",
    recommendedQuestions.map((q) => q.id),
  );

  return recommendedQuestions;
};

export const getQuizExp = async (
  quizResult: {
    questionId: number;
    userAnswer: number;
    duration: number;
    correctness: number;
  }[],
) => {
  const answers = quizResult.map(({ correctness, duration }) => [
    correctness,
    duration,
  ]);

  const expGain = await fetch(`${process.env.ML_API_BASE_URL}/exp`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ answers }),
  });

  type response = {
    status: string;
    data: {
      exp: number;
    };
  };

  const {
    data: { exp },
  } = (await expGain.json()) as response;

  return exp;
};
