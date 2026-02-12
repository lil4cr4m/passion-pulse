/**
 * DATABASE CONNECTION CONFIGURATION
 * PostgreSQL connection pool setup for SkillCast application
 */

import pkg from "pg"; // Import PostgreSQL client
const { Pool } = pkg; // Extract Pool class from CommonJS module
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

/**
 * Create PostgreSQL connection pool
 * Pool manages multiple database connections efficiently
 * Connection details are loaded from environment variables
 */
const pool = new Pool({
  user: process.env.DB_USER, // Database username
  host: process.env.DB_HOST, // Database server host (usually localhost)
  database: process.env.DB_NAME, // Database name (skillcast_db)
  password: process.env.DB_PASSWORD, // Database password
  port: process.env.DB_PORT, // Database port (usually 5432 for PostgreSQL)
});

/**
 * Helper function to execute SQL queries
 * @param {string} text - SQL query string
 * @param {array} params - Query parameters for prepared statements
 * @returns {Promise} - Database query result
 */
export const query = (text, params) => pool.query(text, params);

// Export the pool for advanced use cases
export default pool;
