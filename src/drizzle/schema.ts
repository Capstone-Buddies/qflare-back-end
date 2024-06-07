import {
  index,
  mysqlTable,
  varchar,
  int,
  timestamp,
  text,
  tinyint,
  primaryKey,
} from "drizzle-orm/mysql-core";

export const users = mysqlTable(
  "user",
  {
    id: varchar("id", { length: 128 }).primaryKey().notNull(),
    username: varchar("username", { length: 256 }).notNull(),
    email: varchar("email", { length: 256 }).notNull(),
    password: varchar("password", { length: 256 }).notNull(),
    level: int("level").notNull().default(1),
    exp: int("exp").notNull().default(0),
  },
  (users) => ({
    nameIdx: index("email_idx").on(users.email),
  }),
);

export type UserType = typeof users.$inferSelect;

export const quizCategories = mysqlTable("quiz_category", {
  id: int("id").primaryKey().autoincrement(),
  quizType: varchar("quiz_type", { length: 256 }).notNull(),
  quizCategory: varchar("quiz_category", { length: 256 }).notNull(),
});

export type QuizCategoryType = typeof quizCategories.$inferSelect;

export const quizQuestions = mysqlTable("quiz_question", {
  id: int("id").primaryKey().autoincrement(),
  quizCategoryId: int("quiz_category_id")
    .references(() => quizCategories.id)
    .notNull(),
  question: text("question").notNull(),
  option1: text("option1").notNull(),
  option2: text("option2").notNull(),
  option3: text("option3").notNull(),
  option4: text("option4").notNull(),
  answer: tinyint("answer").notNull(),
});

export type QuizQuestionType = typeof quizQuestions.$inferSelect;

export const quizHistories = mysqlTable("quiz_history", {
  id: int("id").primaryKey().autoincrement(),
  userId: varchar("user_id", { length: 256 })
    .references(() => users.id)
    .notNull(),
  timestamp: timestamp("timestamp").notNull(),
  grade: int("grade").notNull(),
  level: int("level").notNull(),
  quizCategoryId: int("quiz_category_id")
    .references(() => quizCategories.id)
    .notNull(),
});

export type QuizHistoryType = typeof quizHistories.$inferSelect;

export const answerHistories = mysqlTable(
  "answer_history",
  {
    quizHistoryId: int("quiz_history_id")
      .references(() => quizHistories.id)
      .notNull(),
    questionId: int("question_id")
      .references(() => quizQuestions.id)
      .notNull(),
    userAnswer: tinyint("user_answer").notNull(),
    correctness: tinyint("correctness").notNull(),
    duration: timestamp("duration").notNull(),
  },
  (table) => {
    return {
      pk: primaryKey({ columns: [table.quizHistoryId, table.questionId] }),
    };
  },
);

export type AnswerHistoryType = typeof answerHistories.$inferSelect;
