import { QuizCategoryType } from "@/drizzle/schema";

const validId: QuizCategoryType["id"][] = [1, 2, 3, 4, 5, 6, 7];
const validQuizCategory: QuizCategoryType["quizCategory"][] = [
  "TPS",
  "Literasi"
];

export type QuizCategoryDummyType = { id: (typeof validId)[number] } & {
  quizCategory: (typeof validQuizCategory)[number];
};

export const quizCategoriesDummy: Omit<QuizCategoryDummyType, "id">[] =
  validQuizCategory.map((category) => {
    return { quizCategory: category };
  });

export default quizCategoriesDummy;
