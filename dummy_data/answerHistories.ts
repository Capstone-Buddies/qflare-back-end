import { AnswerHistoryType } from "@/drizzle/schema";
import { QuizHistoryDummyType } from "./quizHistories";
import { QuizQuestionDummyType } from "./quizQuestions";

export type AnswerHistoryDummyType = AnswerHistoryType & {
  quizHistoryId: QuizHistoryDummyType["id"];
  questionId: QuizQuestionDummyType["id"];
};
