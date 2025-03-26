const mysql = require("mysql2/promise");
const fs = require("fs");
const path = require("path");
require("dotenv").config();

async function runMigration() {
  let connection;
  try {
    // Create connection without database first
    connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
    });

    // Create database if not exists
    await connection.query("CREATE DATABASE IF NOT EXISTS employee_management");

    // Close initial connection and reconnect to the specific database
    await connection.end();

    connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: "employee_management",
      multipleStatements: true,
    });

    // Read migration file
    const migrationPath = path.join(__dirname, "../database/schema.sql");
    const migrationScript = fs.readFileSync(migrationPath, "utf8");

    // Remove DELIMITER statements and split by procedure/statement
    const scriptWithoutDelimiters = migrationScript
      .replace(/DELIMITER\s*.*;/g, "")
      .replace(/\/\/\s*$/gm, ";");

    // Split statements, handling potential multiline statements
    const statements = scriptWithoutDelimiters
      .split(/;\s*(?=CREATE|INSERT|SELECT)/g)
      .map((stmt) => stmt.trim())
      .filter((stmt) => stmt.length > 0);

    // Execute each statement
    for (const statement of statements) {
      try {
        await connection.query(statement);
        console.log(`Executed: ${statement.substring(0, 100)}...`);
      } catch (stmtError) {
        console.error(`Error in statement: ${statement}`, stmtError);
        // Optionally throw to stop migration or continue based on your needs
      }
    }

    console.log("Migration completed successfully");
  } catch (error) {
    console.error("Migration failed:", error);
    process.exit(1);
  } finally {
    if (connection) await connection.end();
  }
}

// Allow direct execution or import
if (require.main === module) {
  runMigration();
}

module.exports = runMigration;
