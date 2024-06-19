import { nanoid } from "nanoid";
import { UserType } from "../schema";

export type UserDummyType = UserType;

export const usersDummy: Omit<UserDummyType, "level" | "token" | "exp">[] = [
  {
    id: nanoid(32),
    username: "admin",
    email: "admin@qflare.org",
    schoolOrigin: "SMA Negeri Dummy 1",
    password: "Admin01",
    profileImgUrl:
      "https://storage.googleapis.com/qflarebucket/24-248253_user-profile-default-image-png-clipart-png-download.png",
  },
  {
    id: nanoid(32),
    username: "bambang",
    email: "bambang@gmail.com",
    schoolOrigin: "SMA DummyData 2",
    password: "bambangP20",
    profileImgUrl:
      "https://storage.googleapis.com/qflarebucket/24-248253_user-profile-default-image-png-clipart-png-download.png",
  },
  {
    id: nanoid(32),
    username: "clair",
    email: "clair@mistic.com",
    schoolOrigin: "SMA Dummy 88",
    password: "Clairvoyance0",
    profileImgUrl:
      "https://storage.cloud.google.com/image_profilee/933-9332131_profile-picture-default-png.png",
  },
  {
    id: nanoid(32),
    username: "Voyance",
    email: "voyance@mistic.com",
    schoolOrigin: "MAN 1 Dummy",
    password: "clairVoyance1",
    profileImgUrl:
      "https://storage.googleapis.com/qflarebucket/24-248253_user-profile-default-image-png-clipart-png-download.png",
  },
  {
    id: nanoid(32),
    username: "bismillah",
    email: "testing@qflare.org",
    schoolOrigin: "MA 1 Dummy",
    password: "MenyalaAbangkuh99",
    profileImgUrl:
      "https://storage.googleapis.com/qflarebucket/24-248253_user-profile-default-image-png-clipart-png-download.png",
  },
];
