const inquirer = require('inquirer');
const mySQL = require('mysql2');

const PORT = process.env.PORT || 3001;

const db = mysql.createConnection(
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

  // Default response for any other request (Not Found)
app.use((req, res) => {
    res.status(404).end();
  });
  
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });