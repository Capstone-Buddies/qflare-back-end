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

export const quizQuestions: QuizCategoryDummyType[] = [
  {
    id: 1,
    quizType: "TPS",
    quizCategory: "PU",
  },
  {
    id: 2,
    quizType: "TPS",
    quizCategory: "PPU",
  },
  {
    id: 3,
    quizType: "TPS",
    quizCategory: "PBM",
  },
  {
    id: 4,
    quizType: "TPS",
    quizCategory: "PK",
  },
  {
    id: 5,
    quizType: "Literasi",
    quizCategory: "BI",
  },
  {
    id: 6,
    quizType: "Literasi",
    quizCategory: "EN",
  },
  {
    id: 7,
    quizType: "Literasi",
    quizCategory: "PM",
  },
];

quizQuestions;
