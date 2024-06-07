import { QuizHistoryType } from "@/drizzle/schema";
import { QuizCategoryDummyType } from "./quizCategories";
import { usersDummy } from "./users";

const dummyId = Array.from({ length: 2 }, (_, index) => index + 1);

export type QuizHistoryDummyType = QuizHistoryType & {
  id: (typeof dummyId)[number];
  quizCategoryId: QuizCategoryDummyType["id"];
};

export const quizHistories: Omit<QuizHistoryDummyType, "id">[] = [
  {
    userId: usersDummy[3].id,
    timestamp: new Date("2024-05-28T08:00:00Z"),
    grade: 80,
    level: 1,
    quizCategoryId: 4
  },
  {
    userId: usersDummy[4].id,
    timestamp: new Date("2024-06-13T03:44:00Z"),
    grade: 90,
    level: 1,
    quizCategoryId: 7
  }
];
