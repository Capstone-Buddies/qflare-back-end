import { Response } from "express";
import { AuthenticatedRequest } from "../middlewares/auth.middleware";
import {
  getLeaderboardQuery,
  updateUserProfileImage,
  uploadFileToGCS,
} from "../models/user.model";
import { status } from "../constants";

import { processFileConfig } from "../config/storage.config";

export const getUserProfile = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  const { username, email, level, exp, schoolOrigin, profileImgUrl } =
    req.user!;
  return res
    .json({
      status: status.success,
      message: "Successfully retrieved user profile",
      data: { username, email, schoolOrigin, level, exp, profileImgUrl },
    })
    .status(200);
};

export const getLeaderboard = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    const leaderboard = await getLeaderboardQuery();

    return res.status(200).json({
      status: status.success,
      data: { leaderboard },
      message: "Leaderboard fetched successfully",
    });
  } catch (error) {
    return res.status(500).json({
      status: status.fail,
      message: "An error occurred while load Leaderboard",
    });
  }
};

export const updateUserProfile = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  const userId = req.user!.id;
  try {
    await processFileConfig(req, res);

    const file = req.file;
    if (!file) {
      return res
        .status(400)
        .json({ status: status.fail, message: "No file uploaded" });
    }

    const profileImageUrl = await uploadFileToGCS(file);

    await updateUserProfileImage(userId, profileImageUrl);

    return res.status(200).json({
      status: status.success,
      data: { profileImageUrl },
      message: "Profile image change successfully",
    });
  } catch (error) {
    console.error("Error updating profile image:", error);
    return res.status(500).json({
      status: status.fail,
      message: "An error occurred while change user profile image",
    });
  }
};
