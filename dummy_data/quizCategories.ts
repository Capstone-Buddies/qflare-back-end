import { QuizCategoryType } from "@/drizzle/schema";

const validId: QuizCategoryType["id"][] = [1, 2, 3, 4, 5, 6, 7];
const validQuizType: QuizCategoryType["quizType"][] = ["TPS", "Literasi"];
const validTPSCategoryType: QuizCategoryType["quizCategory"][] = [
  "PU",
  "PPU",
  "PBM",
  "PK",
];
const validLiterasiCategoryType: QuizCategoryType["quizCategory"][] = [
  "BI",
  "EN",
  "PM",
];

export type QuizCategoryDummyType = { id: (typeof validId)[number] } & (
  | {
    quizType: (typeof validQuizType)[0];
    quizCategory: (typeof validTPSCategoryType)[number];
  }
  | {
    quizType: (typeof validQuizType)[1];
    quizCategory: (typeof validLiterasiCategoryType)[number];
  }
);

export const quizCategoriesDummy: Omit<QuizCategoryDummyType, "id">[] = [
  {
    quizType: "TPS",
    quizCategory: "PU",
  },
  {
    quizType: "TPS",
    quizCategory: "PPU",
  },
  {
    quizType: "TPS",
    quizCategory: "PBM",
  },
  {
    quizType: "TPS",
    quizCategory: "PK",
  },
  {
    quizType: "Literasi",
    quizCategory: "BI",
  },
  {
    quizType: "Literasi",
    quizCategory: "EN",
  },
  {
    quizType: "Literasi",
    quizCategory: "PM",
  },
];

quizCategoriesDummy;
