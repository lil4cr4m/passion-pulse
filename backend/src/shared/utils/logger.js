/**
 * ERROR LOGGING UTILITY
 * Provides consistent error logging across all application features
 */

/**
 * Logs errors with contextual information for debugging
 *
 * @param {string} location - Where the error occurred (e.g., 'authController.login')
 * @param {Error|string} err - The error object or error message
 * @param {object} meta - Additional context data (e.g., userId, requestData)
 *
 * Example usage:
 *   logError('authController.login', err, { email: 'user@example.com' });
 *
 * Output format:
 *   [Error] authController.login | meta={"email":"user@example.com"}: Invalid credentials
 */
export const logError = (location, err, meta) => {
  // Format optional metadata as JSON string
  const metaLabel =
    meta && Object.keys(meta).length ? ` | meta=${JSON.stringify(meta)}` : "";

  // Extract error message (handle both Error objects and strings)
  const message = err?.message || err;

  // Create formatted error log line
  const line = `[Error] ${location}${metaLabel}: ${message}\n`;

  // Write to stderr (separate from regular console output)
  process.stderr.write(line);

  // Include stack trace for debugging if available
  if (err?.stack) {
    process.stderr.write(`${err.stack}\n`);
  }
};

// Default export for convenience
export default logError;
