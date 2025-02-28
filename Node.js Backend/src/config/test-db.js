import { db } from "./db.js";

async function testConnection() {
  try {
    const result = await db.execute("SELECT NOW();");
    console.log("Connected to PostgreSQL!", result);
  } catch (error) {
    console.error("Database connection failed:", error);
  }
}

testConnection();
