// Lightweight error logger to add consistent context across controllers
export const logError = (location, err, meta) => {
  const metaLabel =
    meta && Object.keys(meta).length ? ` | meta=${JSON.stringify(meta)}` : "";
  const message = err?.message || err;
  const line = `[Error] ${location}${metaLabel}: ${message}\n`;
  process.stderr.write(line);
  if (err?.stack) {
    process.stderr.write(`${err.stack}\n`);
  }
};

export default logError;
