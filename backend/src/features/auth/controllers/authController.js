/**
 * AUTHENTICATION CONTROLLER
 * Handles user registration, login, token refresh, logout, and password changes
 * Uses JWT tokens for stateless authentication with refresh token pattern
 */

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { query } from "../../../shared/config/db.js";
import { logError } from "../../../shared/utils/logger.js";

// JWT secret keys with fallback defaults for development
// In production, these should always be set via environment variables
const ACCESS_SECRET = process.env.JWT_SECRET || "dev_access_secret";
const REFRESH_SECRET =
  process.env.JWT_REFRESH_SECRET ||
  process.env.JWT_SECRET ||
  "dev_refresh_secret";

/**
 * Generates JWT access and refresh tokens for authenticated users
 * Access tokens are short-lived (15 minutes) for security
 * Refresh tokens are long-lived (7 days) for user convenience
 *
 * @param {object} user - User object containing id and role
 * @returns {object} Object containing accessToken and refreshToken
 */
const generateTokens = (user) => {
  const accessToken = jwt.sign(
    { id: user.id, role: user.role }, // Include user ID and role in token payload
    ACCESS_SECRET,
    { expiresIn: "15m" }, // Short-lived for security
  );

  const refreshToken = jwt.sign(
    { id: user.id }, // Only include user ID in refresh token
    REFRESH_SECRET,
    { expiresIn: "7d" }, // Long-lived for convenience
  );

  return { accessToken, refreshToken };
};

// ==========================================
// REGISTRATION ENDPOINT
// ==========================================

/**
 * Creates a new user account with hashed password
 * Validates required fields and handles duplicate username/email errors
 */
export const register = async (req, res) => {
  const { username, email, password, name } = req.body;

  // Validate required fields are present
  if (!username || !email || !password) {
    return res
      .status(400)
      .json({ error: "Missing required registration fields" });
  }

  try {
    // Generate salt for password hashing (12 rounds = strong security)
    const salt = await bcrypt.genSalt(12);

    // Hash the password with the salt
    const hashedPwd = await bcrypt.hash(password, salt);

    // Insert new user into database
    const newUser = await query(
      "INSERT INTO users (username, email, password_hash, name) VALUES ($1, $2, $3, $4) RETURNING id, username, role",
      [username, email, hashedPwd, name],
    );

    // Return the created user (without password)
    res.status(201).json(newUser.rows[0]);
  } catch (err) {
    // Log error with context for debugging
    logError("authController.register", err, { email, username });

    // Generic error message to avoid exposing internal details
    res
      .status(500)
      .json({ error: "Registration failed: Email/Username likely taken." });
  }
};

// ==========================================
// LOGIN ENDPOINT
// ==========================================

/**
 * Authenticates user with email/password and returns JWT tokens
 * Creates refresh token entry in database for session management
 */
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Verify JWT secrets are configured
    if (!ACCESS_SECRET || !REFRESH_SECRET) {
      return res.status(500).json({
        error:
          "Server auth secrets missing. Please set JWT_SECRET and JWT_REFRESH_SECRET",
      });
    }

    // Find user by email
    const userRes = await query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    if (userRes.rows.length === 0) {
      return res.status(401).json({ error: "Invalid Credentials" });
    }

    const user = userRes.rows[0];

    // Compare provided password with hashed password in database
    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid Credentials" });
    }

    // Generate JWT tokens for the authenticated user
    const { accessToken, refreshToken } = generateTokens(user);

    // Store refresh token in database for revocation capability
    await query(
      "INSERT INTO refresh_tokens (user_id, token, expires_at) VALUES ($1, $2, NOW() + INTERVAL '7 days')",
      [user.id, refreshToken],
    );

    // Return tokens and safe user data (no password)
    res.json({
      accessToken,
      refreshToken,
      user: {
        id: user.id,
        username: user.username,
        role: user.role,
        credit: user.credit,
      },
    });
  } catch (err) {
    logError("authController.login", err, { email });
    res.status(500).json({ error: "Login server error" });
  }
};

// ==========================================
// REFRESH TOKEN ENDPOINT
// ==========================================

/**
 * Generates a new access token using a valid refresh token
 * Validates refresh token exists in database and hasn't been revoked
 */
export const refreshToken = async (req, res) => {
  const { token } = req.body;

  if (!token) {
    return res.status(401).json({ error: "Refresh token required" });
  }

  try {
    // Verify refresh token exists in database (not revoked)
    const tokenInDb = await query(
      "SELECT * FROM refresh_tokens WHERE token = $1",
      [token],
    );

    if (tokenInDb.rows.length === 0) {
      return res.status(403).json({ error: "Token revoked" });
    }

    // Verify the refresh token signature and expiration
    const decoded = jwt.verify(token, REFRESH_SECRET);

    // Get current user data for new token
    const user = await query("SELECT id, role FROM users WHERE id = $1", [
      decoded.id,
    ]);

    // Generate new access token (refresh token stays the same)
    const newTokens = generateTokens(user.rows[0]);
    res.json({ accessToken: newTokens.accessToken });
  } catch (err) {
    logError("authController.refreshToken", err);
    res.status(403).json({ error: "Invalid refresh token" });
  }
};

// ==========================================
// LOGOUT ENDPOINT
// ==========================================

/**
 * Logs out user by removing refresh token from database
 * This prevents the refresh token from being used again
 */
export const logout = async (req, res) => {
  const { token } = req.body;

  try {
    // Remove refresh token from database (revoke session)
    await query("DELETE FROM refresh_tokens WHERE token = $1", [token]);
    res.json({ message: "Logged out successfully" });
  } catch (err) {
    logError("authController.logout", err);
    res.status(500).json({ error: "Logout failed" });
  }
};

// ==========================================
// PASSWORD CHANGE ENDPOINT
// ==========================================

/**
 * Changes user password after verifying current password
 * Invalidates all refresh tokens to force re-authentication
 */
export const changePassword = async (req, res) => {
  const userId = req.user?.id; // From authenticateToken middleware
  const { currentPassword, newPassword } = req.body;

  // Validate required fields
  if (!currentPassword || !newPassword) {
    return res
      .status(400)
      .json({ error: "Current and new password are required" });
  }

  // Enforce minimum password length
  if (newPassword.length < 8) {
    return res
      .status(400)
      .json({ error: "New password must be at least 8 characters" });
  }

  try {
    // Get current user data
    const userRes = await query(
      "SELECT id, password_hash FROM users WHERE id = $1",
      [userId],
    );

    if (userRes.rows.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    const user = userRes.rows[0];

    // Verify current password is correct
    const valid = await bcrypt.compare(currentPassword, user.password_hash);
    if (!valid) {
      return res.status(401).json({ error: "Current password is incorrect" });
    }

    // Hash the new password
    const salt = await bcrypt.genSalt(12);
    const hashed = await bcrypt.hash(newPassword, salt);

    // Update password in database
    await query("UPDATE users SET password_hash = $1 WHERE id = $2", [
      hashed,
      userId,
    ]);

    // Invalidate all existing refresh tokens to force re-authentication
    await query("DELETE FROM refresh_tokens WHERE user_id = $1", [userId]);

    res.json({ message: "Password updated successfully" });
  } catch (err) {
    logError("authController.changePassword", err, { userId });
    res.status(500).json({ error: "Failed to update password" });
  }
};
