const pool = require("./db");

const createTables = async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS "user" (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        password TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS "post" (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        thumbnail TEXT, 
        user_id INTEGER REFERENCES "user"(id) ON DELETE CASCADE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    console.log("Tables created successfully!");
  } catch (err) {
    console.error("Error creating tables:", err);
  } finally {
    pool.end();
  }
};

createTables();
