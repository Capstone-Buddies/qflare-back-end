import bcrypt from "bcryptjs";
import { db } from "./db";
import { answerHistoriesDummy } from "./dummyData/answerHistories";
import { questionCategoriesDummy } from "./dummyData/questionCategories";
import { quizCategoriesDummy } from "./dummyData/quizCategories";
import { quizHistoriesDummy } from "./dummyData/quizHistories";
import { quizQuestionsDummy } from "./dummyData/quizQuestions";
import { usersDummy } from "./dummyData/users";
import {
  answerHistories,
  questionCategories,
  quizCategories,
  quizHistories,
  quizQuestions,
  users,
} from "./schema";

async function seedUsers() {
  for (const user of usersDummy) {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    await db.insert(users).values({
      id: user.id,
      username: user.username,
      email: user.email,
      password: hashedPassword,
    });
  }
}

async function seedQuizCategories() {
  for (const quizCategory of quizCategoriesDummy) {
    await db.insert(quizCategories).values({
      quizCategory: quizCategory.quizCategory,
    });
  }
}

async function seedQuestionCategories() {
  for (const questionCategory of questionCategoriesDummy) {
    await db.insert(questionCategories).values({
      questionCategory: questionCategory.questionCategory,
    });
  }
}

async function seedQuizQuestions() {
  for (const quizQuestion of quizQuestionsDummy) {
    await db.insert(quizQuestions).values({
      question: quizQuestion.question,
      answer: quizQuestion.answer,
      questionCategoryId: quizQuestion.questionCategoryId,
      option1: quizQuestion.option1,
      option2: quizQuestion.option2,
      option3: quizQuestion.option3,
      option4: quizQuestion.option4,
    });
  }
}

async function seedQuizHistories() {
  for (const quizHistory of quizHistoriesDummy) {
    await db.insert(quizHistories).values({
      userId: quizHistory.userId,
      timestamp: quizHistory.timestamp,
      grade: quizHistory.grade,
      level: quizHistory.level,
      quizCategoryId: quizHistory.quizCategoryId,
    });
  }
}

async function seedAnswerHistories() {
  for (const answerHistory of answerHistoriesDummy) {
    await db.insert(answerHistories).values({
      quizHistoryId: answerHistory.quizHistoryId,
      questionId: answerHistory.questionId,
      userAnswer: answerHistory.userAnswer,
      correctness: answerHistory.correctness,
      duration: answerHistory.duration,
    });
  }
}

async function main() {
  console.log("Beginning seeding...\n");

  process.stdout.write("Seeding [user]...");
  await seedUsers();
  console.log(", completed");

  process.stdout.write("Seeding [quiz_category]...");
  await seedQuizCategories();
  console.log(", completed");

  process.stdout.write("Seeding [question_category]...");
  await seedQuestionCategories();
  console.log(", completed");

  process.stdout.write("Seeding [quiz_question]...");
  await seedQuizQuestions();
  console.log(", completed");

  process.stdout.write("Seeding [quiz_history]...");
  await seedQuizHistories();
  console.log(", completed");

  process.stdout.write("Seeding [answer_history]...");
  await seedAnswerHistories();
  console.log(", completed");

  console.log("\nSeeding completed!");
  process.exit(0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
