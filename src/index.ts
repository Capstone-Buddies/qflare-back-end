import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import loggingMiddleware from "./middlewares/logging.middleware";
import authRouter from "./routes/auth.route";
import quizRouter from "./routes/quiz.route";
import userRouter from "./routes/user.route";

dotenv.config();

const qFlareApp = express();
const port = process.env.PORT || 3000;

qFlareApp.use(cors());
qFlareApp.use(express.json());
qFlareApp.use(loggingMiddleware);

qFlareApp.get("/", (_req, res) => {
  res
    .json({
      status: "ok",
      message: "You're entering root route QFlare backend",
    })
    .status(200);
});

qFlareApp.use("/auth", authRouter);
qFlareApp.use("/users", userRouter);
qFlareApp.use("/quizzes", quizRouter);

qFlareApp.use("*", (_req, res) => {
  res.status(404).json({
    status: "fail",
    message: "Route not found",
  });
});

qFlareApp.listen(port, () => {
  console.log("\x1b[34m", `[Express] listening at http://localhost:${port}`);
});
