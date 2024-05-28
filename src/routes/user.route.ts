import express from "express";

const userRouter = express.Router();

userRouter.get("/", (_req, res) => res.json({ message: "Hello, user!" }));

export default userRouter;
