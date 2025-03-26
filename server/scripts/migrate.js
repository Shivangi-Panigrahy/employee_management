
const mysql = require('mysql2/promise');
const fs = require('fs');
const path = require('path');

async function runMigration() {
    try {
        const connection = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD
        });

        // Create database
        await connection.query('CREATE DATABASE IF NOT EXISTS employee_management');
        await connection.query('USE employee_management');

        // Read and execute SQL file
        const sqlScript = fs.readFileSync(
            path.join(__dirname, '../database/schema.sql'), 
            'utf8'
        );
        
        await connection.query(sqlScript);
        
        console.log('Database migrated successfully');
        await connection.end();
    } catch (error) {
        console.error('Migration failed:', error);
    }
}

runMigration();