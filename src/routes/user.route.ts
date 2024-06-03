import authMiddleware from "@/middlewares/auth.middleware";
import { getLeaderboard, getUserProfile } from "@/controllers/user.controller";
import express from "express";

const userRouter = express.Router();

// TODO: this is dummy route, remove it later
userRouter.delete("/delete", authMiddleware, (_req, res) =>
  res.json({ message: "Hello, user!" })
);
userRouter.get("/my-profile", getUserProfile);
userRouter.get("/leaderboard", getLeaderboard);

// NOTE: Optional endpoints, develop later if have more time
// userRouter.put("/my-profile", (_req, res) => res.json({ message: "Hello, user!" }));
// userRouter.delete("/my-profile", (_req, res) => res.json({ message: "Hello, user!" }));

export default userRouter;
