// test-db.js
import { query } from "../src/shared/config/db.js";

async function test() {
  try {
    const res = await query(
      "SELECT username, karma FROM users WHERE role = $1",
      ["admin"],
    );
    console.log("Admin check:", res.rows[0]);
    process.exit(0);
  } catch (err) {
    console.error("Connection failed:", err);
    process.exit(1);
  }
}

test();
