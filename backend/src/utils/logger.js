// Lightweight error logger to add consistent context across controllers
export const logError = (location, err, meta) => {
  const metaLabel =
    meta && Object.keys(meta).length ? ` | meta=${JSON.stringify(meta)}` : "";
  const message = err?.message || err;
  console.error(`[Error] ${location}${metaLabel}: ${message}`);
  if (err?.stack) {
    console.error(err.stack);
  }
};

export default logError;
