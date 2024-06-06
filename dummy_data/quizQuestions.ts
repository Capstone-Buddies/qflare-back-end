import { QuizQuestionType } from "@/drizzle/schema";
import { QuizCategoryDummyType } from "./quizCategories";

const dummyId = Array.from({ length: 20 }, (_, index) => index + 1);

export type QuizQuestionDummyType = QuizQuestionType & {
  id: (typeof dummyId)[number];
  quizCategoryId: QuizCategoryDummyType["id"];
  answer: 1 | 2 | 3 | 4;
};

export const quizHistories: QuizQuestionDummyType[] = [];
