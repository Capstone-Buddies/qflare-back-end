import { Storage } from "@google-cloud/storage";
import multer from "multer";
import util from "util";
import dotenv from "dotenv";

dotenv.config();

const storage = new Storage({
  keyFilename: process.env.GCP_KEYFILE_PATH,
  projectId: process.env.GCP_PROJECT_ID,
});

const bucket = storage.bucket(`${process.env.GCP_BUCKET_NAME!}`);

const multerConfig = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit untuk file
  },
});
const processFileConfig = util.promisify(
  multerConfig.single("profile_img_url")
);

export { storage, bucket, multerConfig, processFileConfig };
