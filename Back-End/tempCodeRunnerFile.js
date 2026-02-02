// backend/db.js (Replace old connection file content)
const mysql = require('mysql2/promise'); // Use mysql2/promise for async/await

// !!! IMPORTANT: UPDATE THESE DETAILS TO MATCH YOUR MYSQL SETUP !!!
const pool = mysql.createPool({
    host: 'localhost',          // Should be localhost or your DB host
    user: 'your_mysql_user',    // <-- CHANGE THIS
    password: 'your_mysql_password', // <-- CHANGE THIS
    database: 'AgroTrade',      // Use the database name from your SQL file
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

module.exports = pool;