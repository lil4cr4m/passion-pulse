/**
 * AUTHENTICATION ROUTES
 * Defines all authentication-related endpoints
 * Handles user registration, login, logout, token refresh, and password changes
 */

import express from "express";
import {
  register,
  login,
  refreshToken,
  changePassword,
  logout,
} from "../controllers/authController.js";
import { authenticateToken } from "../../../shared/middleware/authMiddleware.js";

// Create Express router for auth endpoints
const router = express.Router();

// ==========================================
// PUBLIC AUTHENTICATION ROUTES
// ==========================================

/**
 * POST /api/auth/register
 * Creates a new user account
 * Body: { username, email, password, name }
 */
router.post("/register", register);

/**
 * POST /api/auth/login
 * Authenticates user and returns JWT tokens
 * Body: { email, password }
 * Returns: { accessToken, refreshToken, user }
 */
router.post("/login", login);

/**
 * POST /api/auth/refresh
 * Generates new access token using refresh token
 * Body: { token: refreshToken }
 * Returns: { accessToken }
 */
router.post("/refresh", refreshToken);

// ==========================================
// PROTECTED AUTHENTICATION ROUTES
// ==========================================

/**
 * POST /api/auth/change-password
 * Changes user password (requires authentication)
 * Headers: Authorization: Bearer <accessToken>
 * Body: { currentPassword, newPassword }
 */
router.post("/change-password", authenticateToken, changePassword);

/**
 * POST /api/auth/logout
 * Revokes refresh token and ends session (requires authentication)
 * Headers: Authorization: Bearer <accessToken>
 * Body: { token: refreshToken }
 */
router.post("/logout", authenticateToken, logout);

export default router;
