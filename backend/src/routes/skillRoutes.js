import express from "express";
import { authenticateToken } from "../middleware/authMiddleware.js";
import {
  getAllSkills,
  getUserSkills,
  addUserSkill,
} from "../controllers/skillController.js";

const router = express.Router();

// Publicly available catalog
router.get("/", getAllSkills);

// Get skills for a specific profile
router.get("/user/:userId", getUserSkills);

// Protected: Add a skill to your own profile
router.post("/add", authenticateToken, addUserSkill);

export default router;
