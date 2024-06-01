import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { nanoid } from "nanoid";
import { users } from "../drizzle/schema";
import { db } from "../drizzle/db";
import { eq } from "drizzle-orm";

const findUserByEmail = async (email: string) => {
  return await db.select().from(users).where(eq(users.email, email));
};

const createUserInDB = async (
  username: string,
  email: string,
  password: string
) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const userId = nanoid(32);
  await db.insert(users).values({
    id: userId,
    username,
    email,
    password: hashedPassword,
    level: 1,
    exp: 0,
  });
  return { userId, email };
};

const getUserByEmail = async (email: string) => {
  return await db
    .select({
      id: users.id,
      password: users.password,
    })
    .from(users)
    .where(eq(users.email, email.toLowerCase()))
    .limit(1);
};

const generateToken = (userId: string, email: string) => {
  const jwtSecret = process.env.JWT_SECRET as string;
  return jwt.sign({ userId, email }, jwtSecret, { expiresIn: "1d" });
};

export { findUserByEmail, createUserInDB, getUserByEmail, generateToken };
