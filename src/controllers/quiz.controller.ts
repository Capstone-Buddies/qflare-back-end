import { status } from "@/constants";
import { AuthenticatedRequest } from "@/middlewares/auth.middleware";
import { getUserQuizHistories } from "@/models/quiz.model";
import { Request, Response } from "express";

export const generateQuiz = async (req: Request, res: Response) => {
  // TODO: Implement generateQuiz
  return res
    .json({
      status: status.success,
      message: "This endpoint has not implemented yet",
    })
    .status(200);
};

export const calculateQuiz = async (req: Request, res: Response) => {
  // TODO: Implement caculateQuiz
  return res
    .json({
      status: status.success,
      message: "This endpoint has not implemented yet",
    })
    .status(200);
};

export const getQuizHistories = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    const userId = req.user?.id;

    if (userId) {
      const histories = await getUserQuizHistories(userId);

      if (histories.length === 0) {
        return res.status(200).json({
          status: status.success,
          message: "User has no quiz histories.",
        });
      }

      return res.status(200).json({
        status: status.success,
        data: { histories },
        message: "Successfully retrieved quiz histories",
      });
    }
  } catch (error) {
    return res.status(500).json({
      status: status.fail,
      message: "An error occurred while load quiz histories",
    });
  }
};

export const getQuizAnswers = async (req: Request, res: Response) => {
  // TODO: Implement getQuizAnswers
  return res
    .json({
      status: status.success,
      message: "This endpoint has not implemented yet",
    })
    .status(200);
};
