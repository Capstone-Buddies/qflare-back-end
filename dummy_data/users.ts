import { UserType } from "@/drizzle/schema";
import { nanoid } from "nanoid";

export type UserDummyType = UserType;

export const usersDummy: Omit<UserDummyType, "level" | "exp">[] = [
  {
    id: nanoid(32),
    username: "admin",
    email: "admin@qflare.org",
    password: "Admin01",
  },
  {
    id: nanoid(32),
    username: "bambang",
    email: "bambang@gmail.com",
    password: "bambangP20",
  },
  {
    id: nanoid(32),
    username: "clair",
    email: "clair@mistic.com",
    password: "Clairvoyance0",
  },
  {
    id: nanoid(32),
    username: "Voyance",
    email: "voyance@mistic.com",
    password: "clairVoyance1",
  },
  {
    id: nanoid(32),
    username: "bismillah",
    email: "testing@qflare.org",
    password: "MenyalaAbangkuh99",
  },
];
