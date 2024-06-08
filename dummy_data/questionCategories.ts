import { QuestionCategoryType } from "@/drizzle/schema";

const validId: QuestionCategoryType["id"][] = [1, 2, 3, 4, 5, 6, 7];
const validQuestionCategory: QuestionCategoryType["questionCategory"][] = [
  "PU",
  "PPU",
  "PBM",
  "PK",
  "BI",
  "EN",
  "PM",
];

export type QuestionCategoryDummyType = { id: (typeof validId)[number] } & {
  questionCategory: (typeof validQuestionCategory)[number];
};

export const questionCategoriesDummy: Omit<QuestionCategoryDummyType, "id">[] =
  validQuestionCategory.map((category) => {
    return { questionCategory: category };
  });

export default questionCategoriesDummy;
