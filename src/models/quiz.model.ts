import { db } from "@/drizzle/db";
import { eq } from "drizzle-orm";
import { quizHistories, quizCategories } from "@/drizzle/schema";

export const getUserQuizHistories = async (userId: string) => {
  try {
    const histories = await db
      .select({
        timestamp: quizHistories.timestamp,
        grade: quizHistories.grade,
        level: quizHistories.level,
        quizCategory: quizCategories.quizCategory,
      })
      .from(quizHistories)
      .innerJoin(
        quizCategories,
        eq(quizHistories.quizCategoryId, quizCategories.id)
      )
      .where(eq(quizHistories.userId, userId));

    return histories;
  } catch (error) {
    console.error("Error fetching quiz histories from database:", error);
    throw new Error("Database query failed");
  }
};
