import { migrate } from "drizzle-orm/mysql2/migrator";
import { connection, db } from "./db.js";

async function main() {
  console.log("Migrating database...");

  await migrate(db, { migrationsFolder: "./drizzle_out" });
  connection.end();

  console.log("Migration done!");
  process.exit(0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
