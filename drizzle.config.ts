import { defineConfig } from "drizzle-kit";
export default defineConfig({
  schema: "./src/drizzle/schema.ts",
  out: "./drizzle",
  dialect: "mysql",
  dbCredentials: {
    host: process.env.DRIZZLE_DB_HOST!,
    user: process.env.DRIZZLE_DB_USER!,
    password: process.env.DRIZZLE_DB_PASSWORD!,
    database: process.env.DRIZZLE_DB_NAME!,
  },
});
