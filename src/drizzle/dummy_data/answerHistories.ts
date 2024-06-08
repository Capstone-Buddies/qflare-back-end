import { AnswerHistoryType } from "../schema";
import { QuizHistoryDummyType } from "./quizHistories";
import { QuizQuestionDummyType } from "./quizQuestions";

export type AnswerHistoryDummyType = AnswerHistoryType & {
  quizHistoryId: QuizHistoryDummyType["id"];
  questionId: QuizQuestionDummyType["id"];
  userAnswer: QuizQuestionDummyType["answer"];
};

export const answerHistoriesDummy: AnswerHistoryDummyType[] = [
  {
    quizHistoryId: 1,
    questionId: 1,
    userAnswer: 2,
    correctness: 0,
    duration: new Date(0, 0, 0, 0, 7, 18, 78),
  },
  {
    quizHistoryId: 1,
    questionId: 2,
    userAnswer: 2,
    correctness: 0,
    duration: new Date(0, 0, 0, 0, 5, 13, 34),
  },
  {
    quizHistoryId: 1,
    questionId: 3,
    userAnswer: 2,
    correctness: 0,
    duration: new Date(0, 0, 0, 0, 3, 45, 12),
  },
  {
    quizHistoryId: 1,
    questionId: 4,
    userAnswer: 2,
    correctness: 0,
    duration: new Date(0, 0, 0, 0, 2, 11, 45),
  },
  {
    quizHistoryId: 1,
    questionId: 5,
    userAnswer: 2,
    correctness: 0,
    duration: new Date(0, 0, 0, 0, 4, 23, 56),
  },
  {
    quizHistoryId: 1,
    questionId: 6,
    userAnswer: 2,
    correctness: 0,
    duration: new Date(0, 0, 0, 0, 11, 45, 23),
  },
  {
    quizHistoryId: 1,
    questionId: 7,
    userAnswer: 2,
    correctness: 0,
    duration: new Date(0, 0, 0, 0, 9, 23, 45),
  },
  {
    quizHistoryId: 1,
    questionId: 8,
    userAnswer: 2,
    correctness: 0,
    duration: new Date(0, 0, 0, 0, 10, 12, 34),
  },
  {
    quizHistoryId: 1,
    questionId: 9,
    userAnswer: 2,
    correctness: 0,
    duration: new Date(0, 0, 0, 0, 2, 7, 18),
  },
  {
    quizHistoryId: 1,
    questionId: 10,
    userAnswer: 2,
    correctness: 0,
    duration: new Date(0, 0, 0, 0, 4, 3, 45),
  },
  {
    quizHistoryId: 2,
    questionId: 11,
    userAnswer: 2,
    correctness: 0,
    duration: new Date(0, 0, 0, 0, 2, 3, 45),
  },
];
