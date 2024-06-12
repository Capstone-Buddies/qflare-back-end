import { status } from "@/constants";
import { AuthenticatedRequest } from "@/middlewares/auth.middleware";
import { Request, Response } from "express";

export const getUserProfile = async (
  req: AuthenticatedRequest,
  res: Response,
) => {
  const { username, email, level, exp, schoolOrigin, profileImgUrl } = req.user!;

  return res
    .json({
      status: status.success,
      message: "Successfully retrieved user profile",
      data: { username, email, schoolOrigin, level, exp, profileImgUrl },
    })
    .status(200);
};

export const getLeaderboard = async (req: Request, res: Response) => {
  // TODO: Implement getLeaderboard
  return res
    .json({
      status: status.success,
      message: "This endpoint has not implemented yet",
    })
    .status(200);
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
