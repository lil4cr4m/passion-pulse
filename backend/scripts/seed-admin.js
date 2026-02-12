/**
 * ADMIN USER SEEDING SCRIPT
 * Creates a default administrator account for initial system setup
 * Includes password hashing and duplicate prevention
 *
 * Usage: npm run seed:admin
 *
 * Creates admin user with:
 * - Email: admin@skillcast.com
 * - Password: AdminPass123!
 * - Role: admin
 * - Starting credit: 500
 */

import bcrypt from "bcrypt";
import { query } from "../src/shared/config/db.js";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

/**
 * Main seeding function that creates the admin user
 * Includes safety checks to prevent duplicate admin accounts
 * Uses secure password hashing with bcrypt
 */
const seedAdmin = async () => {
  try {
    // Admin account configuration
    const adminEmail = "admin@skillcast.com";
    const adminPassword = "AdminPass123!";
    const adminUsername = "admin_user";

    // Safety check: prevent creating duplicate admin users
    // Verifies if admin already exists by checking email uniqueness
    const existing = await query("SELECT id FROM users WHERE email = $1", [
      adminEmail,
    ]);
    if (existing.rows.length > 0) {
      console.log("✓ Admin user already exists");
      process.exit(0);
    }

    // Secure password hashing using bcrypt
    // Salt rounds: 12 provides good security balance
    const salt = await bcrypt.genSalt(12);
    const hashedPwd = await bcrypt.hash(adminPassword, salt);

    // Create admin user with elevated role and starting credits
    // Admin role enables access to skill catalog management and user administration
    const result = await query(
      "INSERT INTO users (username, email, password_hash, name, role, credit) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id, username, email, role",
      [adminUsername, adminEmail, hashedPwd, "Admin", "admin", 500],
    );

    // Success feedback with login credentials
    console.log("✓ Admin user created successfully:");
    console.log(`  Email: ${adminEmail}`);
    console.log(`  Password: ${adminPassword}`);
    console.log(`  Username: ${adminUsername}`);
    console.log(`  Role: ${result.rows[0].role}`);
    process.exit(0);
  } catch (err) {
    // Error handling with diagnostic information
    console.error("✗ Failed to create admin user:", err.message);
    process.exit(1);
  }
};

// Execute the seeding process
seedAdmin();
