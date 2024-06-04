import jwt from "jsonwebtoken";

export const generateToken = (userId: string, email: string) => {
  const jwtSecret = process.env.JWT_SECRET as string;
  return jwt.sign({ userId, email }, jwtSecret, { expiresIn: "1d" });
};
