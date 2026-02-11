import express from "express";
import {
  getProfile,
  updateProfile,
  getLeaderboard,
  getAllUsers,
  deleteUser,
} from "../controllers/userController.js";
import { authenticateToken } from "../middleware/authMiddleware.js";

const router = express.Router();

/**
 * PUBLIC ROUTES
 */
// Fetch the top 10 users by Karma
router.get("/leaderboard", getLeaderboard);

// View a specific user's impact stats and bio
router.get("/profile/:id", getProfile);

/**
 * PROTECTED ROUTES (Optional additions)
 */
router.put("/profile/:id", authenticateToken, updateProfile);

/**
 * ADMIN ROUTES
 */
// Get all users (admin only)
router.get("/admin/all", authenticateToken, getAllUsers);

// Delete a user (admin only)
router.delete("/:id", authenticateToken, deleteUser);

export default router;
