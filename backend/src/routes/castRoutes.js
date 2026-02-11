import express from "express";
import { authenticateToken } from "../middleware/authMiddleware.js";
import {
  createCast,
  getAllCasts,
  updateCast,
  deleteCast,
} from "../controllers/castController.js";

const router = express.Router();

// Public Feed
router.get("/", getAllCasts);

// Protected Actions
router.post("/", authenticateToken, createCast);
router.put("/:id", authenticateToken, updateCast);
router.delete("/:id", authenticateToken, deleteCast);

export default router;
