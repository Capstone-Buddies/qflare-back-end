import { createUser, loginUser } from "@/controllers/user.controller";
import authMiddleware from "@/middlewares/auth.middleware";
import express from "express";

const userRouter = express.Router();

userRouter.get("/", (_req, res) => res.json({ message: "Hello, user!" }));
userRouter.post("/register", createUser);
userRouter.post("/login", loginUser);

// TODO: this is dummy route, remove it later
userRouter.delete("/delete", authMiddleware, (_req, res) =>
  res.json({ message: "Hello, user!" })
);

export default userRouter;
