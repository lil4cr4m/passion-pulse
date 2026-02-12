import bcrypt from "bcrypt";
import { query } from "../src/shared/config/db.js";
import dotenv from "dotenv";

dotenv.config();

const seedAdmin = async () => {
  try {
    const adminEmail = "admin@skillcast.com";
    const adminPassword = "AdminPass123!";
    const adminUsername = "admin_user";

    // Check if admin already exists
    const existing = await query("SELECT id FROM users WHERE email = $1", [
      adminEmail,
    ]);
    if (existing.rows.length > 0) {
      console.log("✓ Admin user already exists");
      process.exit(0);
    }

    // Hash password
    const salt = await bcrypt.genSalt(12);
    const hashedPwd = await bcrypt.hash(adminPassword, salt);

    // Insert admin user
    const result = await query(
      "INSERT INTO users (username, email, password_hash, name, role, credit) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id, username, email, role",
      [adminUsername, adminEmail, hashedPwd, "Admin", "admin", 500],
    );

    console.log("✓ Admin user created successfully:");
    console.log(`  Email: ${adminEmail}`);
    console.log(`  Password: ${adminPassword}`);
    console.log(`  Username: ${adminUsername}`);
    console.log(`  Role: ${result.rows[0].role}`);
    process.exit(0);
  } catch (err) {
    console.error("✗ Failed to create admin user:", err.message);
    process.exit(1);
  }
};

seedAdmin();
