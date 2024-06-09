import { login, logout, register } from "@/controllers/auth.controller";
import authMiddleware from "@/middlewares/auth.middleware";
import { requestValidationMiddleware } from "@/middlewares/requestValidation.middleware";
import {
  loginSchema,
  logoutSchema,
  registerSchema,
} from "@/zod/schemas/authRoute";
import express from "express";

const authRouter = express.Router();

authRouter.post(
  "/register",
  requestValidationMiddleware(registerSchema),
  register
);
authRouter.post("/login", requestValidationMiddleware(loginSchema), login);
authRouter.get(
  "/logout",
  authMiddleware,
  requestValidationMiddleware(logoutSchema),
  logout
);

export default authRouter;
