const validId = [1, 2, 3, 4, 5, 6, 7] as const;
const validQuestionCategory = [
  "PU",
  "PPU",
  "PBM",
  "PK",
  "BI",
  "EN",
  "PM",
] as const;

export type QuestionCategoryDummyType = {
  id: (typeof validId)[number];
  questionCategory: (typeof validQuestionCategory)[number];
};

export const questionCategoriesDummy: Omit<QuestionCategoryDummyType, "id">[] =
  validQuestionCategory.map((category) => {
    return { questionCategory: category };
  });
