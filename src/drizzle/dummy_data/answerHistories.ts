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
    // duration: new Date(0, 0, 0, 0, 7, 18, 78),
    duration: 34
  },
  {
    quizHistoryId: 1,
    questionId: 2,
    userAnswer: 2,
    correctness: 0,
    duration: 5
  },
  {
    quizHistoryId: 1,
    questionId: 3,
    userAnswer: 2,
    correctness: 0,
    duration: 23
  },
  {
    quizHistoryId: 1,
    questionId: 4,
    userAnswer: 2,
    correctness: 0,
    duration: 18
  },
  {
    quizHistoryId: 1,
    questionId: 5,
    userAnswer: 2,
    correctness: 0,
    duration: 22
  },
  {
    quizHistoryId: 1,
    questionId: 6,
    userAnswer: 2,
    correctness: 0,
    duration: 9
  },
  {
    quizHistoryId: 1,
    questionId: 7,
    userAnswer: 2,
    correctness: 0,
    duration: 24
  },
  {
    quizHistoryId: 1,
    questionId: 8,
    userAnswer: 2,
    correctness: 0,
    duration: 30
  },
  {
    quizHistoryId: 1,
    questionId: 9,
    userAnswer: 2,
    correctness: 0,
    duration: 40
  },
  {
    quizHistoryId: 1,
    questionId: 10,
    userAnswer: 2,
    correctness: 0,
    duration: 59
  },
  {
    quizHistoryId: 2,
    questionId: 11,
    userAnswer: 2,
    correctness: 0,
    duration: 22
  },
];
