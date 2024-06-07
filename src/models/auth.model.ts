import jwt from "jsonwebtoken";
import { db } from "@/drizzle/db";
import { users } from "@/drizzle/schema";
import { eq } from "drizzle-orm";

export const generateToken = async (userId: string, email: string) => {
  const jwtSecret = process.env.JWT_SECRET as string;
  const token = jwt.sign({ userId, email }, jwtSecret, { expiresIn: "1d" });
  await db.update(users).set({ token: token }).where(eq(users.id, userId));
  return token;
};

export const invalidateToken = async (userId: string) => {
  await db.update(users).set({ token: null }).where(eq(users.id, userId));
};
