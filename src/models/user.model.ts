import bcrypt from "bcryptjs";
import { eq, sql } from "drizzle-orm";
import { nanoid } from "nanoid";
import { db } from "../drizzle/db";
import { users } from "../drizzle/schema";

export const findUserByEmail = async (email: string) => {
  return await db.select().from(users).where(eq(users.email, email));
};

export const addUser = async (
  username: string,
  email: string,
  password: string,
  schoolOrigin: string
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
    schoolOrigin,
  });
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
export const getLeaderboardQuery = async () => {
  return db
    .select({
      username: users.username,
      level: users.level,
      exp: users.exp,
      profileImgUrl: users.profileImgUrl,
    })
    .from(users)
    .orderBy(sql`${users.level} DESC`)
    .limit(10);
};
