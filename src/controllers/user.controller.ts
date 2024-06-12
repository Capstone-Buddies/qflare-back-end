import { status } from "@/constants";
import { getLeaderboardQuery } from "@/models/user.model";
import { Request, Response } from "express";

export const getUserProfile = async (req: Request, res: Response) => {
  // TODO: Implement getUserProfile
  return res
    .json({
      status: status.success,
      message: "This endpoint has not implemented yet",
    })
    .status(200);
};

export const getLeaderboard = async (req: Request, res: Response) => {
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

// NOTE: Controllers for optional  endpoints, develop later if have more time
// export const updateUserProfile = async (req: Request, res: Response) => {
//   // TODO: Implement updateUserProfile
//   return res
//     .json({ status: status.success, message: "This endpoint has not implemented yet" })
//     .status(200);
// };

// export const deleteAccount = async (req: Request, res: Response) => {
//   // TODO: Implement deleteAccount
//   return res
//     .json({ status: status.success, message: "This endpoint has not implemented yet" })
//     .status(200);
// };
