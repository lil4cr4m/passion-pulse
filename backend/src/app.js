import express from "express";
import cors from "cors";
import dotenv from "dotenv";

// Import Routes
import authRoutes from "./routes/authRoutes.js";
import pulseRoutes from "./routes/pulseRoutes.js";
import interestRoutes from "./routes/interestRoutes.js";
import noteRoutes from "./routes/noteRoutes.js";
import userRoutes from "./routes/userRoutes.js";

// Import our database query helper
import { query } from "./config/db.js";

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// ==========================================
// MIDDLEWARE
// ==========================================
const allowedOrigins = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(",")
  : [];

app.use(
  cors({
    origin: function (origin, callback) {
      // allow requests with no origin (like mobile apps or curl requests)
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        return callback(new Error("CORS policy violation"), false);
      }
      return callback(null, true);
    },
    credentials: true,
  }),
);

app.use(express.json()); // Parse incoming JSON requests

// ==========================================
// HEALTH CHECK & ERROR HANDLING
// ==========================================
app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "active", timestamp: new Date() });
});

// ==========================================
// ROUTE HANDLERS
// ==========================================
app.use("/api/auth", authRoutes); // Registration, Login, Refresh
app.use("/api/users", userRoutes); // Profiles & Leaderboards
app.use("/api/pulses", pulseRoutes); // Live Now signals
app.use("/api/interests", interestRoutes); // Vibe Catalog
app.use("/api/notes", noteRoutes); // Gratitude & Karma

// ==========================================
// FALLBACKS & ERROR HANDLER
// ==========================================
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Internal Server Error" });
});

// ==========================================
// SERVER INITIALIZATION
// ==========================================
app.listen(PORT, () => {
  console.log(`🚀 Server running in 2026 mode on http://localhost:${PORT}`);
  console.log(`📈 Check health at http://localhost:${PORT}/api/health`);
});

export default app;
