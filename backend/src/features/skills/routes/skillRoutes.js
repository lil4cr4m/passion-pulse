import express from "express";
import { authenticateToken } from "../../../shared/middleware/authMiddleware.js";
import {
  getAllSkills,
  getUserSkills,
  addUserSkill,
  createSkill,
  updateSkill,
  deleteSkill,
} from "../controllers/skillController.js";

const router = express.Router();

// Publicly available catalog
router.get("/", getAllSkills);

// Get skills for a specific profile
router.get("/user/:userId", getUserSkills);

// Protected: Add a skill to your own profile
router.post("/add", authenticateToken, addUserSkill);

// Admin: Create a new skill
router.post("/", authenticateToken, createSkill);

// Admin: Update a skill
router.put("/:id", authenticateToken, updateSkill);

// Admin: Delete a skill
router.delete("/:id", authenticateToken, deleteSkill);

export default router;
