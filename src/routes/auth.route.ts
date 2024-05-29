import express from "express";

const authRouter = express.Router();

authRouter.get("/", (_req, res) => res.json({ message: "Hello, qflare!" }));

export default authRouter;
