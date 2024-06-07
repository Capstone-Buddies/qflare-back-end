import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import dotenv from "dotenv";
import { users } from "../drizzle/schema";
import { db } from "../drizzle/db";
import { eq } from "drizzle-orm";

dotenv.config();

export interface AuthenticatedRequest extends Request {
  user?: JwtPayload & { userId?: string };
}

const authMiddleware = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(" ")[1];

    try {
      // Verifikasi token
      const decodedToken = jwt.verify(
        token,
        process.env.JWT_SECRET!
      ) as JwtPayload & { userId: string };

      // Cek apakah pengguna ada di database berdasarkan id pengguna yang terdapat dalam token
      const user = (
        await db
          .select()
          .from(users)
          .where(eq(users.id, decodedToken.userId))
          .limit(1)
      )[0];

      console.log(user)

      if (user.token === null) {
        return res.status(403).json({
          status: "fail",
          message: "Invalid token",
        });
      }

      req.user = { ...decodedToken, userId: user.id };

      next();
    } catch (error) {
      console.error("Error authenticating JWT:", error);
      return res.status(403).json({
        status: "fail",
        message: "Invalid token",
      });
    }
  } else {
    res.status(401).json({
      status: "fail",
      message: "Authorization header not found",
    });
  }
};

export default authMiddleware;
