const validId = [1, 2] as const;
const validQuizCategory = [
  "TPS",
  "Literasi",
] as const;

export type QuizCategoryDummyType = {
  id: (typeof validId)[number];
  quizCategory: (typeof validQuizCategory)[number];
};

export const quizCategoriesDummy: Omit<QuizCategoryDummyType, "id">[] =
  validQuizCategory.map((category) => {
    return { quizCategory: category };
  });
