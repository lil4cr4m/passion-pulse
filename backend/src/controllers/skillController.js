import { query } from "../config/db.js";
import { logError } from "../utils/logger.js";

/**
 * GET ALL SKILLS
 * Returns the global skill catalog (Requirement 1.5)
 */
export const getAllSkills = async (req, res) => {
  try {
    const result = await query(
      "SELECT * FROM skills ORDER BY channel, name ASC",
    );
    res.json(result.rows);
  } catch (err) {
    logError("skillController.getAllSkills", err);
    res.status(500).json({ error: "Failed to fetch skill catalog" });
  }
};

/**
 * GET USER'S SKILLS
 * Returns the skill list pinned to a specific user's profile.
 */
export const getUserSkills = async (req, res) => {
  const { userId } = req.params;

  try {
    const result = await query(
      `SELECT s.*
       FROM user_skills us
       JOIN skills s ON us.skill_id = s.id
       WHERE us.user_id = $1
       ORDER BY s.channel, s.name`,
      [userId],
    );

    res.json(result.rows);
  } catch (err) {
    logError("skillController.getUserSkills", err, { userId });
    res.status(500).json({ error: "Failed to fetch user skills" });
  }
};

/**
 * ADD USER SKILL
 * Pins a skill to the user's persistent profile (Requirement 1.7)
 */
export const addUserSkill = async (req, res) => {
  const { skillId } = req.body;
  if (!skillId)
    return res.status(400).json({ error: "No Skill ID provided" });

  try {
    // Use user ID from JWT (req.user.id)
    await query(
      "INSERT INTO user_skills (user_id, skill_id) VALUES ($1, $2) ON CONFLICT DO NOTHING",
      [req.user.id, skillId],
    );
    res.status(201).json({ message: "Skill pinned to profile" });
  } catch (err) {
    logError("skillController.addUserSkill", err, {
      userId: req.user.id,
      skillId,
    });
    res.status(500).json({ error: "Could not update profile skills" });
  }
};
