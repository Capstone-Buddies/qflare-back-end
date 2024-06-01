import cors from "cors";
import express from "express";
import dotenv from "dotenv";
import loggingMiddleware from "./middlewares/logging.middleware";
import userRouter from "./routes/user.route";
import authRouter from "./routes/auth.route";

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

qFlareApp.use("/users", userRouter);
qFlareApp.use("/auth", authRouter);

qFlareApp.listen(port, () => {
  console.log("\x1b[34m", `[Express] listening at http://localhost:${port}`);
});