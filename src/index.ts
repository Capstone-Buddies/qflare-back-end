import cors from "cors";
import express from "express";
import dotenv from "dotenv";
import loggingMiddleware from "./middlewares/logging.middleware";
import userRouter from "./routes/user.route";

dotenv.config();

const playground = express();
const port = process.env.PORT || 3000;

playground.use(cors());
playground.use(express.json());
playground.use(loggingMiddleware);

playground.get("/", (_req, res) => {
  res
    .json({
      status: "ok",
      message: "You're entering root route QFlare backend",
    })
    .status(200);
});

playground.use("/users", userRouter);

playground.listen(port, () => {
  console.log("\x1b[34m", `[Express] listening at http://localhost:${port}`);
});

