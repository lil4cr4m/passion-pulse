import { query } from "../config/db.js";
import { logError } from "../utils/logger.js";

/**
 * GET ALL INTERESTS
 * Returns the global vibe catalog (Requirement 1.5)
 */
export const getAllInterests = async (req, res) => {
  try {
    const result = await query(
      "SELECT * FROM interests ORDER BY vibe_category, name ASC",
    );
    res.json(result.rows);
  } catch (err) {
    logError("interestController.getAllInterests", err);
    res.status(500).json({ error: "Failed to fetch vibe catalog" });
  }
};

/**
 * GET USER'S INTERESTS
 * Returns the vibe list pinned to a specific user's profile.
 */
export const getUserInterests = async (req, res) => {
  const { userId } = req.params;

  try {
    const result = await query(
      `SELECT i.*
       FROM user_interests ui
       JOIN interests i ON ui.interest_id = i.id
       WHERE ui.user_id = $1
       ORDER BY i.vibe_category, i.name`,
      [userId],
    );

    res.json(result.rows);
  } catch (err) {
    logError("interestController.getUserInterests", err, { userId });
    res.status(500).json({ error: "Failed to fetch user interests" });
  }
};

/**
 * ADD USER INTEREST
 * Pins a vibe to the user's persistent profile (Requirement 1.7)
 */
export const addUserInterest = async (req, res) => {
  const { interestId } = req.body;
  if (!interestId)
    return res.status(400).json({ error: "No Interest ID provided" });

  try {
    // Use user ID from JWT (req.user.id)
    await query(
      "INSERT INTO user_interests (user_id, interest_id) VALUES ($1, $2) ON CONFLICT DO NOTHING",
      [req.user.id, interestId],
    );
    res.status(201).json({ message: "Vibe pinned to profile" });
  } catch (err) {
    logError("interestController.addUserInterest", err, {
      userId: req.user.id,
      interestId,
    });
    res.status(500).json({ error: "Could not update profile interests" });
  }
};
