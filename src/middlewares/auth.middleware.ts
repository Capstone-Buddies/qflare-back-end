import dotenv from "dotenv";
import { eq } from "drizzle-orm";
import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { db } from "../drizzle/db";
import { UserType, users } from "../drizzle/schema";

dotenv.config();

export interface AuthenticatedRequest<
  TParams = any,
  TRes = any,
  TBody = any,
  TQueryParams = any,
> extends Request<TParams, TRes, TBody, TQueryParams> {
  user?: Omit<UserType, "password" | "token">;
}

const authMiddleware = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(" ")[1];

    try {
      // Verifikasi token
      const decodedToken = jwt.verify(
        token,
        process.env.JWT_SECRET!,
      ) as JwtPayload & { userId: string };

      // Cek apakah pengguna ada di database berdasarkan id pengguna yang terdapat dalam token
      const user = (
        await db
          .select()
          .from(users)
          .where(eq(users.id, decodedToken.userId))
          .limit(1)
      )[0];

      if (!user || user.token === null) {
        return res.status(403).json({
          status: "fail",
          message: "Invalid token",
        });
      }

      req.user = {
        id: user.id,
        username: user.username,
        email: user.email,
        level: user.level,
        exp: user.exp,
        schoolOrigin: user.schoolOrigin,
        profileImgUrl: user.profileImgUrl,
      };

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
