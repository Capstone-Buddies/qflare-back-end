import bcrypt from "bcryptjs";
import { Request, Response } from "express";
import { findUserByEmail, addUser, getUserByEmail } from "@/models/user.model";
import { generateToken } from "@/models/auth.model";

const success: string = "success";
const fail: string = "fail";

// Register User
export const register = async (req: Request, res: Response) => {
  const {
    username,
    email,
    password,
  }: { username: string; email: string; password: string } = req.body;

  if (!username) {
    return res
      .status(400)
      .json({ status: fail, message: "Username is required" });
  }

  if (!email) {
    return res.status(400).json({ status: fail, message: "Email is required" });
  }

  if (!password) {
    return res
      .status(400)
      .json({ status: fail, message: "Password is required" });
  }

  try {
    const existingUser = await findUserByEmail(email);

    if (existingUser.length > 0) {
      return res.status(409).json({
        status: fail,
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
    return res
      .status(400)
      .json({ status: fail, message: "Unable to add user" });
  }
};

// Login User
export const login = async (req: Request, res: Response) => {
  const { email, password }: { email: string; password: string } = req.body;

  if (!email || !password) {
    return res.status(403).json({
      status: fail,
      message: "Email and password are required",
    });
  }

  try {
    const result = await getUserByEmail(email);

    if (result.length === 0) {
      return res.status(401).json({
        status: fail,
        message: "Invalid email or password",
      });
    }

    const user = result[0];
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({
        status: fail,
        message: "Invalid email or password",
      });
    }

    const token = generateToken(user.id, email);

    return res.status(200).json({
      status: success,
      data: { email, token },
      message: "User logged in successfully",
    });
  } catch (error) {
    console.error("Error logging in:", error);
    return res.status(400).json({ status: fail, message: "Unable to login" });
  }
};

export const logout = async (_req: Request, res: Response) => {
  // TODO: Implement logout
  return res
    .status(200)
    .json({ status: fail, message: "This endpoint has not implemented yet" });
};
