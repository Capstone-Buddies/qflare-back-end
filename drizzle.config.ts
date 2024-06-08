import { defineConfig } from "drizzle-kit";
export default defineConfig({
  schema: "./src/drizzle/schema.ts",
  out: "./drizzle_out",
  dialect: "mysql",
  dbCredentials: {
    host: process.env.MYSQL_DB_HOST!,
    user: process.env.MYSQL_DB_USER!,
    password: process.env.MYSQL_DB_PASSWORD!,
    database: process.env.MYSQL_DB_NAME!,
  },
});
