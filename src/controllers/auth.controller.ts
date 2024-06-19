import { status } from "@/constants";
import { AuthenticatedRequest } from "@/middlewares/auth.middleware";
import { generateToken, invalidateToken } from "@/models/auth.model";
import { addUser, findUserByEmail, getUserByEmail } from "@/models/user.model";
import { LoginRequest, RegisterRequest } from "@/zod/schemas/authRoute";
import bcrypt from "bcryptjs";
import { Response } from "express";

// Register User
export const register = async (req: RegisterRequest, res: Response) => {
  const { username, email, password, schoolOrigin } = req.body;
  const profileImgUrl =
    "https://storage.googleapis.com/qflarebucket/24-248253_user-profile-default-image-png-clipart-png-download.png";

  try {
    const existingUser = await findUserByEmail(email);

    if (existingUser.length > 0) {
      return res.status(409).json({
        status: status.fail,
        message: "Email is already in use",
      });
    }

    await addUser(username, email, password, schoolOrigin, profileImgUrl);

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

// Login User
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

    const token = await generateToken(user.id, email); // Generate token

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

// Logout User
export const logout = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId = req.user?.id;

    if (userId) {
      await invalidateToken(userId);
      return res.status(200).json({
        status: status.success,
        message: "User logged out successfully",
      });
    }
  } catch (error) {
    console.error("Error logging out:", error);
    return res.status(500).json({
      status: status.fail,
      message: "Unable to log user out",
    });
  }
};
