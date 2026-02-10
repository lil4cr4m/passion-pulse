import express from "express";
import cors from "cors";
import dotenv from "dotenv";

// Import our database query helper
import { query } from "./config/db.js";

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// ==========================================
// MIDDLEWARE
// ==========================================
app.use(cors()); // Allow Frontend to talk to Backend
app.use(express.json()); // Parse incoming JSON requests

// ==========================================
// HEALTH CHECK ROUTE
// ==========================================
// A simple route to verify the server and DB are alive
app.get("/api/health", async (req, res) => {
  try {
    const dbCheck = await query("SELECT NOW()");
    res.status(200).json({
      status: "success",
      message: "PassionPulse API is active",
      database: "connected",
      time: dbCheck.rows[0].now,
    });
  } catch (err) {
    res
      .status(500)
      .json({ status: "error", message: "Database connection failed" });
  }
});

// ==========================================
// ROUTE HANDLERS (Placeholders)
// ==========================================
// app.use('/api/auth', authRoutes);
// app.use('/api/pulses', pulseRoutes);

// ==========================================
// SERVER INITIALIZATION
// ==========================================
app.listen(PORT, () => {
  console.log(`🚀 Server running in 2026 mode on http://localhost:${PORT}`);
  console.log(`📈 Check health at http://localhost:${PORT}/api/health`);
});

export default app;
