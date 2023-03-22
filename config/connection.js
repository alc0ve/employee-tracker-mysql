const mySQL = require('mysql2');
require('dotenv').config();

const db = mySQL.createConnection(
    {
      host: process.env.DB_HOST_NAME,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME
    },
    console.log(`Connected to the employee_db database.`.brightGreen)
);

module.exports = db;