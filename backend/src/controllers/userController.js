import { query } from "../config/db.js";
import { logError } from "../utils/logger.js";

/**
 * GET USER PROFILE & STATS
 * Aggregates Credit and activity counts for the Profile dashboard.
 */
export const getProfile = async (req, res) => {
  const { id } = req.params;
  try {
    const userStats = await query(
      `
        SELECT 
          u.id, u.username, u.name, u.bio, u.credit, u.role, u.created_at,
            (SELECT COUNT(*) FROM casts WHERE creator_id = $1) as total_casts,
            (SELECT COUNT(*) FROM gratitude_notes gn 
             JOIN casts c ON gn.cast_id = c.id 
             WHERE c.creator_id = $1) as notes_received
        FROM users u
        WHERE u.id = $1`,
      [id],
    );

    if (userStats.rows.length === 0)
      return res.status(404).json({ error: "User not found" });

    res.json(userStats.rows[0]);
  } catch (err) {
    logError("userController.getProfile", err, { id });
    res.status(500).json({ error: "Failed to fetch user profile" });
  }
};

/**
 * UPDATE PROFILE
 * Allows a user (or admin) to update name/bio.
 */
export const updateProfile = async (req, res) => {
  const { id } = req.params;
  const { name, bio } = req.body;

  const isOwner = req.user && req.user.id?.toString() === id?.toString();
  const isAdmin = req.user && req.user.role === "admin";

  if (!isOwner && !isAdmin) {
    return res.status(403).json({ error: "Forbidden" });
  }

  try {
    const result = await query(
      `UPDATE users 
       SET name = $1, bio = $2, updated_at = NOW() 
       WHERE id = $3 
      RETURNING id, username, email, name, bio, credit, role, created_at`,
      [name ?? null, bio ?? null, id],
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    logError("userController.updateProfile", err, { id });
    res.status(500).json({ error: "Failed to update profile" });
  }
};

/**
 * GET LEADERBOARD
 * Fetches the top 10 users based on Credit.
 */
export const getLeaderboard = async (req, res) => {
  try {
    const leaders = await query(
      "SELECT id, username, credit FROM users ORDER BY credit DESC LIMIT 10",
    );
    res.json(leaders.rows);
  } catch (err) {
    logError("userController.getLeaderboard", err);
    res.status(500).json({ error: "Failed to fetch leaderboard" });
  }
};
