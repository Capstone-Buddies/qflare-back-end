import bcrypt from "bcryptjs";
import { Request, Response } from "express";
import {
  findUserByEmail,
  createUserInDB,
  getUserByEmail,
  generateToken,
} from "../models/user.model";

const success: string = "success";

//Register User
export const createUser = async (req: Request, res: Response) => {
  const {
    username,
    email,
    password,
  }: { username: string; email: string; password: string } = req.body;

  if (!username) {
    return res.status(400).json({ message: "Username is required" });
  }

  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  if (!password) {
    return res.status(400).json({ message: "Password is required" });
  }

  try {
    const existingUser = await findUserByEmail(email);

    if (existingUser.length > 0) {
      return res.status(403).json({
        message: "Email is already in use",
      });
    }

    const { userId } = await createUserInDB(username, email, password);
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
export const loginUser = async (req: Request, res: Response) => {
  const { email, password }: { email: string; password: string } = req.body;

  if (!email || !password) {
    return res.status(403).json({
      message: "Email and password are required",
    });
  }

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

export const getUserProfile = async (req: Request, res: Response) => {
  // TODO: Implement getUserProfile
  return res
    .json({ status: "ok", message: "This endpoint has not implemented yet" })
    .status(200);
};

export const getLeaderboard = async (req: Request, res: Response) => {
  // TODO: Implement getLeaderboard
  return res
    .json({ status: "ok", message: "This endpoint has not implemented yet" })
    .status(200);
};

// NOTE: Controllers for optional  endpoints, develop later if have more time
// export const updateUserProfile = async (req: Request, res: Response) => {
//   // TODO: Implement updateUserProfile
//   return res
//     .json({ status: "ok", message: "This endpoint has not implemented yet" })
//     .status(200);
// };

// export const deleteAccount = async (req: Request, res: Response) => {
//   // TODO: Implement deleteAccount
//   return res
//     .json({ status: "ok", message: "This endpoint has not implemented yet" })
//     .status(200);
// };
