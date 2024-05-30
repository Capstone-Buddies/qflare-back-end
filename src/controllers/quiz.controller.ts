import { Request, Response } from "express";

export const generateQuiz = async (req: Request, res: Response) => {
  // TODO: Implement generateQuiz
  return res
    .json({ status: "ok", message: "This endpoint has not implemented yet" })
    .status(200);
};

export const calculateQuiz = async (req: Request, res: Response) => {
  // TODO: Implement caculateQuiz
  return res
    .json({ status: "ok", message: "This endpoint has not implemented yet" })
    .status(200);
};

export const getQuizesHistories = async (req: Request, res: Response) => {
  // TODO: Implement getHistories
  return res
    .json({ status: "ok", message: "This endpoint has not implemented yet" })
    .status(200);
};

export const getQuizAnswers = async (req: Request, res: Response) => {
  // TODO: Implement getQuizAnswers
  return res
    .json({ status: "ok", message: "This endpoint has not implemented yet" })
    .status(200);
};
