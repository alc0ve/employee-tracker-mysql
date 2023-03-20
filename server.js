const inquirer = require('inquirer');
const express = require('express');
const mySQL = require('mysql2');
const cTable = require('console.table');

const PORT = process.env.PORT || 3001;
const app = express();

const db = mySQL.createConnection(
    {
        host: '127.0.0.1',
        // MySQL username,
        user: 'root',
        // MySQL password
        password: 'Password1',
        database: 'employee_db'
    },
    console.log(`Connected to the employee_db database.`)
);

//Promise used 
const viewAllDepartments = async () => {
    const data = await new Promise ((resolve, reject) => {
    db.query('SELECT * FROM department', (err, results) => {
        if (err) {
            reject(err)
        } else {
            resolve(results)
        }
    });
});
console.table(data);
};

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
                    viewAllDepartments()
                    break;
            }
        });
};

initialPrompt();

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});