/** @type { import("drizzle-kit").Config } */
export default {
  schema: "./configs/schema.js",
  dialect: "postgresql",
  dbCredentials: {
    url: "postgresql://neondb_owner:d2QtbilA8nog@ep-lingering-recipe-a5d6posz.us-east-2.aws.neon.tech/neondb?sslmode=require",
  },
};
