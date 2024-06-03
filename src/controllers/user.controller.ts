import { Request, Response } from "express";

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
