import { login, logout, register } from "@/controllers/auth.controller";
import { requestValidationMiddleware } from "@/middlewares/requestValidation.middleware";
import { loginSchema, registerSchema } from "@/zod/schemas/authRoute";
import express from "express";

const authRouter = express.Router();

authRouter.post("/register", requestValidationMiddleware(registerSchema), register);
authRouter.post("/login", requestValidationMiddleware(loginSchema), login);
authRouter.post("/logout", logout);


export default authRouter;
