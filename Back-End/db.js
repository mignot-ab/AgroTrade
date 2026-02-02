// backend/db.js (Replace old connection file content)
const mysql = require('mysql2/promise'); // Use mysql2/promise for async/await

// !!! IMPORTANT: UPDATE THESE DETAILS TO MATCH YOUR MYSQL SETUP !!!
const pool = mysql.createPool({
    host: 'localhost',         
    user: 'mysql',    
    password: 'root', 
    database: 'agrotrade',     
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

module.exports = pool;