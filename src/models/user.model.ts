import { UserType } from "@/drizzle/schema";
import bcrypt from "bcryptjs";
import { nanoid } from "nanoid";
import { users } from "../drizzle/schema";
import { db } from "../drizzle/db";
import { eq } from "drizzle-orm";

export const findUserByEmail = async (email: string) => {
  return await db.select().from(users).where(eq(users.email, email));
};

export const createUserInDB = async (
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

export const getUserByEmail = async (email: string) => {
  return await db
    .select({
      id: users.id,
      password: users.password,
    })
    .from(users)
    .where(eq(users.email, email.toLowerCase()))
    .limit(1);
};

export const getUsers = async (): Promise<UserType[]> => {
  // TODO: Implement getUsers
  return [];
};

export const getUserById = async (userId: string): Promise<UserType | null> => {
  // TODO: Implement getUserById
  return null;
};
