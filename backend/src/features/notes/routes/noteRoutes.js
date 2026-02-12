import express from "express";
import { authenticateToken } from "../../../shared/middleware/authMiddleware.js";
import {
  createNote,
  getUserNotes,
  getSentNotes,
  updateNote,
  deleteNote,
} from "../controllers/noteController.js";

const router = express.Router();

// Get notes for a specific user's profile (Public)
router.get("/user/:userId", getUserNotes);

// Get notes sent by the authenticated user
router.get("/sent", authenticateToken, getSentNotes);

// Send a note (Protected - must be logged in)
router.post("/", authenticateToken, createNote);

// Update or delete a note (sender/admin or pulse creator for delete)
router.put("/:id", authenticateToken, updateNote);
router.delete("/:id", authenticateToken, deleteNote);

export default router;
