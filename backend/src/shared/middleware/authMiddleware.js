/**
 * AUTHENTICATION MIDDLEWARE
 * JWT token verification and role-based access control
 */

import jwt from "jsonwebtoken";

/**
 * Middleware to authenticate JWT tokens on protected routes
 * Verifies the presence and validity of JWT access tokens
 *
 * Token format: "Authorization: Bearer <jwt_token>"
 *
 * @param {object} req - Express request object
 * @param {object} res - Express response object
 * @param {function} next - Express next middleware function
 */
export const authenticateToken = (req, res, next) => {
  // Extract Authorization header (format: "Bearer <token>")
  const authHeader = req.headers["authorization"];

  // Extract token from "Bearer <token>" format
  const token = authHeader && authHeader.split(" ")[1];

  // Check if token exists
  if (!token) {
    return res.status(401).json({ error: "Access Denied: No token provided" });
  }

  // Verify token signature and expiration
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      // Token is invalid or expired
      return res.status(403).json({ error: "Invalid or expired token" });
    }

    // Token is valid - attach decoded user info to request object
    // This makes user.id and user.role available in route handlers
    req.user = user;

    // Continue to next middleware/route handler
    next();
  });
};

/**
 * Middleware to restrict access to admin users only
 * Must be used AFTER authenticateToken middleware
 *
 * @param {object} req - Express request object (must contain req.user)
 * @param {object} res - Express response object
 * @param {function} next - Express next middleware function
 */
export const isAdmin = (req, res, next) => {
  // Check if user exists and has admin role
  if (req.user && req.user.role === "admin") {
    next(); // User is admin, proceed to route handler
  } else {
    res.status(403).json({ error: "Access Denied: Admins only" });
  }
};
