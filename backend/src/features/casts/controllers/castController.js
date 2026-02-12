import { query } from "../../../shared/config/db.js";
import { logError } from "../../../shared/utils/logger.js";

/**
 * GET CAST FEED
 * Fetches casts created within the last 24h. Supports channel filtering.
 */
export const getAllCasts = async (req, res) => {
  const { category, q } = req.query;
  try {
    let queryText = `
            SELECT c.*, u.username, u.credit, s.name as skill_name, s.channel
            FROM casts c
            JOIN users u ON c.creator_id = u.id
            JOIN skills s ON c.skill_id = s.id
            WHERE c.is_live = true 
            AND c.created_at > NOW() - INTERVAL '24 hours'`;

    const params = [];
    if (category) {
      params.push(category);
      queryText += ` AND s.channel = $${params.length}`;
    }

    if (q) {
      params.push(`%${q}%`);
      const idx = params.length;
      queryText += ` AND (c.title ILIKE $${idx} OR c.description ILIKE $${idx} OR u.username ILIKE $${idx} OR s.name ILIKE $${idx})`;
    }

    queryText += ` ORDER BY c.created_at DESC`;
    const casts = await query(queryText, params);
    res.json(casts.rows);
  } catch (err) {
    logError("castController.getAllCasts", err, { category, q });
    res.status(500).json({ error: "Failed to fetch cast feed" });
  }
};

/**
 * BROADCAST CAST
 * Requirement 1.1: Must include a meeting link
 */
export const createCast = async (req, res) => {
  const { skill_id, title, description, meeting_link } = req.body;

  if (!meeting_link || !title) {
    return res
      .status(400)
      .json({ error: "Title and Meeting Link are required" });
  }

  try {
    const newCast = await query(
      `INSERT INTO casts (creator_id, skill_id, title, description, meeting_link) 
             VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [req.user.id, skill_id, title, description, meeting_link],
    );
    res.status(201).json(newCast.rows[0]);
  } catch (err) {
    logError("castController.createCast", err, { skill_id, title });
    res.status(500).json({ error: "Could not start cast" });
  }
};

/**
 * UPDATE CAST
 * Allows a creator (or admin) to edit the cast details.
 */
export const updateCast = async (req, res) => {
  const { id } = req.params;
  const { skill_id, title, description, meeting_link, is_live } = req.body;

  try {
    const updated = await query(
      `UPDATE casts
       SET skill_id = COALESCE($3, skill_id),
           title = COALESCE($4, title),
           description = COALESCE($5, description),
           meeting_link = COALESCE($6, meeting_link),
           is_live = COALESCE($7, is_live)
       WHERE id = $1 AND (creator_id = $2 OR $8 = 'admin')
       RETURNING *`,
      [
        id,
        req.user.id,
        skill_id,
        title,
        description,
        meeting_link,
        is_live,
        req.user.role,
      ],
    );

    if (updated.rowCount === 0) {
      return res
        .status(404)
        .json({ error: "Cast not found or permission denied" });
    }

    res.json(updated.rows[0]);
  } catch (err) {
    logError("castController.updateCast", err, { id });
    res.status(500).json({ error: "Could not update cast" });
  }
};

/**
 * DELETE CAST
 * Requirement 1.3: Admins or Creators only
 */
export const deleteCast = async (req, res) => {
  try {
    // Ownership check is built directly into the SQL WHERE clause
    const result = await query(
      "DELETE FROM casts WHERE id = $1 AND (creator_id = $2 OR $3 = 'admin')",
      [req.params.id, req.user.id, req.user.role],
    );

    if (result.rowCount === 0)
      return res
        .status(404)
        .json({ error: "Cast not found or permission denied" });

    res.json({ message: "Cast ended" });
  } catch (err) {
    logError("castController.deleteCast", err, { id: req.params.id });
    res.status(500).json({ error: "Deletion failed" });
  }
};

/**
 * END CAST MANUALLY
 * Allows the creator to set is_live to false, removing it from the feed.
 */
export const endCast = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await query(
      "UPDATE casts SET is_live = false WHERE id = $1 AND creator_id = $2 RETURNING *",
      [id, req.user.id], // Only the creator can end it
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Cast not found or unauthorized" });
    }

    res.json({
      message: "Cast session ended successfully",
      cast: result.rows[0],
    });
  } catch (err) {
    logError("castController.endCast", err, { id });
    res.status(500).json({ error: "Failed to end cast" });
  }
};
