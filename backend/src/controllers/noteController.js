import { query } from "../config/db.js";

/**
 * SEND GRATITUDE
 * Links feedback to karma. Triggers 'award_karma' in the DB (Requirement 1.6).
 */
export const createNote = async (req, res) => {
  const { pulse_id, content } = req.body;

  try {
    // Security check: Prevent thanking yourself for karma farming
    const pulseOwner = await query(
      "SELECT creator_id FROM pulses WHERE id = $1",
      [pulse_id],
    );
    if (pulseOwner.rows[0].creator_id === req.user.id) {
      return res
        .status(400)
        .json({ error: "You cannot send gratitude to your own pulse" });
    }

    // 1. Insert Note
    const newNote = await query(
      "INSERT INTO gratitude_notes (pulse_id, sender_id, content) VALUES ($1, $2, $3) RETURNING *",
      [pulse_id, req.user.id, content],
    );

    // 2. FETCH CREATOR INFO: For frontend confirmation
    const creatorRes = await query(
      "SELECT u.username FROM users u JOIN pulses p ON u.id = p.creator_id WHERE p.id = $1",
      [pulse_id],
    );

    res.status(201).json({
      message: `Gratitude logged! ${creatorRes.rows[0].username} earned +10 Karma.`,
      note: newNote.rows[0],
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to send gratitude note" });
  }
};

/**
 * GET NOTES FOR A USER'S PULSES
 * Returns gratitude notes left on any pulse created by the given user.
 */
export const getUserNotes = async (req, res) => {
  const { userId } = req.params;

  try {
    const notes = await query(
      `SELECT gn.id,
              gn.content,
              gn.created_at,
              p.title AS pulse_title,
              u.username AS sender_username
       FROM gratitude_notes gn
       JOIN pulses p ON gn.pulse_id = p.id
       LEFT JOIN users u ON gn.sender_id = u.id
       WHERE p.creator_id = $1
       ORDER BY gn.created_at DESC`,
      [userId],
    );

    res.json(notes.rows);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch gratitude notes" });
  }
};
