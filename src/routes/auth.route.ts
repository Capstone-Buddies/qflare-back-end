import express from "express";
import { register, login, logout } from "../controllers/auth.controller";
import authMiddleware from "../middlewares/auth.middleware";
import { requestValidationMiddleware } from "../middlewares/requestValidation.middleware";
import { registerSchema, loginSchema } from "../zod/schemas/authRoute";

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
  logout
);

export default authRouter;
