import { status } from "@/constants";
import { generateToken } from "@/models/auth.model";
import { addUser, findUserByEmail, getUserByEmail } from "@/models/user.model";
import { LoginRequest, RegisterRequest } from "@/zod/schemas/authRoute";
import bcrypt from "bcryptjs";
import { Request, Response } from "express";

export const register = async (req: RegisterRequest, res: Response) => {
  const { username, email, password } = req.body;

  try {
    const existingUser = await findUserByEmail(email);

    if (existingUser.length > 0) {
      return res.status(409).json({
        status: status.fail,
        message: "Email is already in use",
      });
    }

    const { userId } = await addUser(username, email, password);
    const token = generateToken(userId, email);

    res.cookie("token", token, {});

    return res.status(201).json({
      status: status.success,
      data: { username, email },
      message: "User registered successfully",
    });
  } catch (error) {
    console.error("Error creating user:", error);
    return res
      .status(500)
      .json({ status: status.fail, message: "Unable to register user" });
  }
};

//Login User
export const login = async (req: LoginRequest, res: Response) => {
  const { email, password } = req.body;

  try {
    const result = await getUserByEmail(email);

    if (result.length === 0) {
      return res.status(401).json({
        status: status.fail,
        message: "Email or password is wrong",
      });
    }

    const user = result[0];
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({
        status: status.fail,
        message: "Email or password is wrong",
      });
    }

    const token = generateToken(user.id, email);

    return res.status(200).json({
      status: status.success,
      data: { email, token },
      message: "User logged in successfully",
    });
  } catch (error) {
    console.error("Error logging in:", error);
    return res
      .status(500)
      .json({ status: status.fail, message: "Unable to log user in" });
  }
};

export const logout = async (_req: Request, res: Response) => {
  // TODO: Implement logout
  return res
    .status(200)
    .json({status: status.fail, message: "This endpoint has not implemented yet" });
};
