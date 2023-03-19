const inquirer = require('inquirer');
const express = require('express');
const mySQL = require('mysql2');

const PORT = process.env.PORT || 3001;
const app = express();

const db = mySQL.createConnection(
    {
      host: 'localhost',
      // MySQL username,
      user: 'root',
      // MySQL password
      password: 'Password1',
      database: 'employee_db'
    },
    console.log(`Connected to the employee_db database.`)
  );

  // Query database
db.query('SELECT * FROM department', function (err, results) {
    try {
      console.log(results);
      console.log('Made it to query');
    } catch (err) {
      console.error(err.message);
    }
  });

  // Default response for any other request (Not Found)
app.use((req, res) => {
    res.status(404).end();
  });
  
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });