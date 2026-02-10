import pg from "pg";
import dotenv from "dotenv";

// Load environment variables from .env
dotenv.config();

const { Pool } = pg;

/**
 * DATABASE CONFIGURATION
 * Using a Pool is standard for Express apps to handle multiple
 * concurrent user requests efficiently.
 */
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  // SSL is required for many cloud hosts like Render or Heroku
  ssl:
    process.env.NODE_ENV === "production"
      ? { rejectUnauthorized: false }
      : false,
});

// Log connection success
pool.on("connect", () => {
  console.log("✅ Postgres Connected: Passion Pulse Database is ready.");
});

// Log errors on idle clients
pool.on("error", (err) => {
  console.error("❌ Unexpected error on idle client", err);
  process.exit(-1);
});

/**
 * GLOBAL QUERY HELPER
 * @param {string} text - The SQL query string (use $1, $2 for params)
 * @param {array} params - The values to inject into the query
 */
export const query = (text, params) => {
  return pool.query(text, params);
};

export default pool;
