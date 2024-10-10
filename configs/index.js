// require("dotenv").config();

// import { neon } from "@neondatabase/serverless";
// import { drizzle } from "drizzle-orm/neon-http";
// import * as schema from "./schema";
// const sql = neon(import.meta.env.VITE_DRIZZLE_DATABASE_URL);
// export const db = drizzle(sql, { schema });
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";

// Access the environment variable using import.meta.env
const connectionString =
  "postgresql://neondb_owner:d2QtbilA8nog@ep-lingering-recipe-a5d6posz.us-east-2.aws.neon.tech/neondb?sslmode=require";

if (!connectionString) {
  throw new Error("No database connection string provided.");
}

const sql = neon(connectionString);
export const db = drizzle(sql, { schema });
