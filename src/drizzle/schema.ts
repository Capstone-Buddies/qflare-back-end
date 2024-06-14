import {
  index,
  int,
  mysqlTable,
  primaryKey,
  text,
  timestamp,
  tinyint,
  varchar,
} from "drizzle-orm/mysql-core";

export const users = mysqlTable(
  "user",
  {
    id: varchar("id", { length: 128 }).primaryKey().notNull(),
    username: varchar("username", { length: 256 }).notNull(),
    email: varchar("email", { length: 256 }).unique().notNull(),
    password: varchar("password", { length: 256 }).notNull(),
    level: int("level").default(1),
    exp: int("exp").default(0),
    token: text("token"),
    schoolOrigin: varchar("school_origin", { length: 256 }).notNull(),
    profileImgUrl: varchar("profile_img_url", { length: 256 }),
  },
  (users) => ({
    nameIdx: index("email_idx").on(users.email),
  }),
);

export type UserType = typeof users.$inferSelect;

export const quizCategories = mysqlTable("quiz_category", {
  id: int("id").primaryKey().autoincrement(),
  quizCategory: varchar("quiz_category", { length: 256 }).notNull(),
});

export type QuizCategoryType = typeof quizCategories.$inferSelect;

export const questionCategories = mysqlTable("question_category", {
  id: int("id").primaryKey().autoincrement(),
  questionCategory: varchar("question_category", { length: 256 }).notNull(),
});

export type QuestionCategoryType = typeof questionCategories.$inferSelect;

export const quizQuestions = mysqlTable("quiz_question", {
  id: int("id").primaryKey().autoincrement(),
  questionCategoryId: int("question_category_id")
    .references(() => questionCategories.id)
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
    userAnswer: tinyint("user_answer"),
    correctness: tinyint("correctness").notNull(),
    duration: int("duration").notNull(),
  },
  (table) => {
    return {
      pk: primaryKey({ columns: [table.quizHistoryId, table.questionId] }),
    };
  },
);

export type AnswerHistoryType = typeof answerHistories.$inferSelect;
