import bcrypt from "bcryptjs";
import { Request, Response } from "express";
import { findUserByEmail, addUser, getUserByEmail } from "@/models/user.model";
import { generateToken } from "@/models/auth.model";
import { LoginRequest, RegisterRequest } from "@/zod/schemas/authRoute";

const success: string = "success";

export const register = async (req: RegisterRequest, res: Response) => {
  const { username, email, password } = req.body;

  try {
    const existingUser = await findUserByEmail(email);

    if (existingUser.length > 0) {
      return res.status(403).json({
        message: "Email is already in use",
      });
    }

    const { userId } = await addUser(username, email, password);
    const token = generateToken(userId, email);

    res.cookie("token", token, {});

    return res.status(201).json({
      status: success,
      data: { username, email },
      message: "User registered successfully",
    });
  } catch (error) {
    console.error("Error creating user:", error);
    return res.status(400).json({ message: "Unable to add user" });
  }
};

//Login User
export const login = async (req: LoginRequest, res: Response) => {
  const { email, password }= req.body;

  try {
    const result = await getUserByEmail(email);

    if (result.length === 0) {
      return res.status(403).json({
        message: "Invalid email or password",
      });
    }

    const user = result[0];
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(403).json({
        message: "Invalid email or password",
      });
    }

    const token = generateToken(user.id, email);

    return res.status(200).json({
      status: success,
      data: { email, token },
      message: "User Logged in successfully",
    });
  } catch (error) {
    console.error("Error logging in:", error);
    return res.status(400).json({ message: "Unable to login" });
  }
};

export const logout = async (_req: Request, res: Response) => {
  // TODO: Implement logout
  return res
    .json({ status: "ok", message: "This endpoint has not implemented yet" })
    .status(200);
};
