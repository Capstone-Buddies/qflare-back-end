import { QuizHistoryType } from "@/drizzle/schema";
import { QuizCategoryDummyType } from "./quizCategories";

const dummyId = Array.from({ length: 2 }, (_, index) => index + 1);

export type QuizHistoryDummyType = QuizHistoryType & {
  id: (typeof dummyId)[number];
  quizCategoryId: QuizCategoryDummyType["id"];
};

export const quizHistories: QuizHistoryDummyType[] = [];
