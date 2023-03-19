const inquirer = require('inquirer');
const express = require('express');
const mySQL = require('mysql2');
const cTable = require('console.table');

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
        //   console.log(results);
        console.log('Made it to query');
    } catch (err) {
        console.error(err.message);
    }
});

// Default response for any other request (Not Found)
app.use((req, res) => {
    res.status(404).end();
});

//prompts application start
const initialPrompt = () => {
    inquirer.prompt({
        type: "list",
        name: "initialPrompt",
        message: "What would you like to do?",
        choices: [
            "View All Employees",
            "Add Employee",
            "Update Employee Role",
            "View All Roles",
            "Add Role",
            "View All Departments",
            "Add Department",
            "Quit"
        ]
    })
        .then((answers) => {
            console.log('Answer:', answers.initialPrompt);
            const answer = answers.initialPrompt;
            switch (answer) {
                case 'View All Employees':
                    // viewAllEmployees();
                    break;
                case 'Add Employees':
                    console.log('I chose add employees');
                    break;
                case 'Update Employee Role':
                    console.log('I chose Update Employee Role');
                    break;
                case 'View All Roles':
                    console.log('I chose View All Roles');
                    break;
                case 'Add Role':
                    console.log('I chose Add Role');
                    break;
                case 'View All Departments':
                    // getDepartments()
                    break;
            }
        });
};

initialPrompt();

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});