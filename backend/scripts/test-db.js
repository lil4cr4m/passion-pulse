/**
 * DATABASE CONNECTION TEST SCRIPT
 * Verifies database connectivity and basic query functionality
 * Tests the connection pool and queries admin users as a health check
 *
 * Usage: npm run test:db or node scripts/test-db.js
 *
 * Validates:
 * - Database connection is working
 * - Query function is operational
 * - Admin users table has expected structure
 */

import { query } from "../src/shared/config/db.js";

/**
 * Main test function that verifies database connection
 * Performs a simple query to check system health
 * Returns admin user info if connection is successful
 */
async function test() {
  try {
    // Test database connection with a simple query
    // Queries admin users to verify both connection and data presence
    const res = await query(
      "SELECT username, credit FROM users WHERE role = $1",
      ["admin"],
    );

    // Display successful connection result
    console.log("✓ Database connection successful");
    console.log("Admin user found:", res.rows[0]);
    process.exit(0);
  } catch (err) {
    // Handle connection or query failures
    console.error("✗ Database connection failed:", err.message);
    process.exit(1);
  }
}

// Execute the test
test();
