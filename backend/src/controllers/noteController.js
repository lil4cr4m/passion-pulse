import { query } from "../config/db.js";
import { logError } from "../utils/logger.js";

/**
 * SEND GRATITUDE
 * Links feedback to credit. Triggers 'award_credit' in the DB (Requirement 1.6).
 */
export const createNote = async (req, res) => {
  const { cast_id, content } = req.body;

  try {
    // Security check: Prevent thanking yourself for credit farming
    const castOwner = await query(
      "SELECT creator_id FROM casts WHERE id = $1",
      [cast_id],
    );
    if (castOwner.rows[0].creator_id === req.user.id) {
      return res
        .status(400)
        .json({ error: "You cannot send gratitude to your own cast" });
    }

    // 1. Insert Note
    const newNote = await query(
      "INSERT INTO gratitude_notes (cast_id, sender_id, content) VALUES ($1, $2, $3) RETURNING *",
      [cast_id, req.user.id, content],
    );

    // 2. FETCH CREATOR INFO: For frontend confirmation
    const creatorRes = await query(
      "SELECT u.username FROM users u JOIN casts c ON u.id = c.creator_id WHERE c.id = $1",
      [cast_id],
    );

    res.status(201).json({
      message: `Gratitude logged! ${creatorRes.rows[0].username} earned +10 Credit.`,
      note: newNote.rows[0],
    });
  } catch (err) {
    logError("noteController.createNote", err, { cast_id });
    res.status(500).json({ error: "Failed to send gratitude note" });
  }
};

/**
 * GET NOTES FOR A USER'S CASTS
 * Returns gratitude notes left on any cast created by the given user.
 */
export const getUserNotes = async (req, res) => {
  const { userId } = req.params;

  try {
    const notes = await query(
      `SELECT gn.id,
              gn.content,
              gn.created_at,
          c.title AS cast_title,
              u.username AS sender_username
       FROM gratitude_notes gn
        JOIN casts c ON gn.cast_id = c.id
       LEFT JOIN users u ON gn.sender_id = u.id
        WHERE c.creator_id = $1
       ORDER BY gn.created_at DESC`,
      [userId],
    );

    res.json(notes.rows);
  } catch (err) {
    logError("noteController.getUserNotes", err, { userId });
    res.status(500).json({ error: "Failed to fetch gratitude notes" });
  }
};

/**
 * GET NOTES SENT BY CURRENT USER
 */
export const getSentNotes = async (req, res) => {
  try {
    const notes = await query(
      `SELECT gn.id,
              gn.content,
              gn.created_at,
          c.title AS cast_title,
          c.id   AS cast_id
       FROM gratitude_notes gn
        JOIN casts c ON gn.cast_id = c.id
       WHERE gn.sender_id = $1
       ORDER BY gn.created_at DESC`,
      [req.user.id],
    );

    res.json(notes.rows);
  } catch (err) {
    logError("noteController.getSentNotes", err, { userId: req.user.id });
    res.status(500).json({ error: "Failed to fetch sent notes" });
  }
};

/**
 * UPDATE NOTE (Sender or Admin)
 */
export const updateNote = async (req, res) => {
  const { id } = req.params;
  const { content } = req.body;

  if (!content) return res.status(400).json({ error: "Content is required" });

  try {
    const result = await query(
      `UPDATE gratitude_notes gn
       SET content = $1
       WHERE gn.id = $2
         AND (gn.sender_id = $3 OR $4 = 'admin')
       RETURNING *`,
      [content, id, req.user.id, req.user.role],
    );

    if (result.rowCount === 0) {
      return res
        .status(404)
        .json({ error: "Note not found or permission denied" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    logError("noteController.updateNote", err, { id });
    res.status(500).json({ error: "Failed to update note" });
  }
};

/**
 * DELETE NOTE (Sender, Cast Creator, or Admin)
 */
export const deleteNote = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await query(
      `DELETE FROM gratitude_notes gn
       USING casts c
       WHERE gn.id = $1
         AND gn.cast_id = c.id
         AND (gn.sender_id = $2 OR c.creator_id = $2 OR $3 = 'admin')`,
      [id, req.user.id, req.user.role],
    );

    if (result.rowCount === 0) {
      return res
        .status(404)
        .json({ error: "Note not found or permission denied" });
    }

    res.json({ message: "Note removed" });
  } catch (err) {
    logError("noteController.deleteNote", err, { id });
    res.status(500).json({ error: "Failed to delete note" });
  }
};
