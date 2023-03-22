const inquirer = require('inquirer');
const mySQL = require('mysql2');
const cTable = require('console.table');
const colors = require('colors');
const figlet = require('figlet');
const { query } = require('./config/connection');
const db = require('./config/connection');

//View All Employees
const viewAllEmployees = async () => {
    //long query-- saved to variable to make it easier to read
    const allEmployeesQuery = `SELECT
  employees.id,
  employees.first_name,
  employees.last_name,
  roles.title,
  department.dep_name AS 'department',
  roles.salary,
  CONCAT(manager.first_name, ' ', manager.last_name) AS 'manager'
FROM
  employees
  JOIN roles ON employees.role_id = roles.id
  JOIN department ON roles.department_id = department.id
  LEFT JOIN employees AS manager ON employees.manager_id = manager.id
ORDER BY
  employees.id ASC;`

    const data = await new Promise((resolve, reject) => {
        db.query(allEmployeesQuery, (err, results) => {
            if (err) {
                reject(err)
            } else {
                resolve(results)
            }
        });
    });
    console.log('');
    console.table(data);
    initialPrompt();
}

//Add Employee
const addEmployee = () => {
    //show role and id to pick
    db.query("SELECT id, title FROM roles", (err, results) => {
        if (err) {
            console.log(err);
        } else {
            let employeeArray = results.map((obj) => {
                return {
                    //changes keys 'id' & 'title' to 'value' & 'name'
                    value: obj.id,
                    name: obj.title
                };
            });
            // resolve(results)
            // console.log(employeeArray);
            //query to get manager name and id
            db.query("SELECT manager_id, first_name, last_name FROM employees", async (err, results) => {
                if (err) {
                    console.log(err);
                } else {
                    let managerArray = results.map((obj) => {
                        return {
                            value: obj.manager_id,
                            name: obj.first_name + ' ' + obj.last_name,
                        };
                    });

                    managerArray.push({ value: 'NULL', name: 'None' });
                    // console.log(managerArray);

                    await inquirer.prompt([
                        {
                            type: 'input',
                            name: 'firstName',
                            message: 'What is the employees First Name?',
                        },
                        {
                            type: 'input',
                            name: 'lastName',
                            message: 'What is the employees Last Name?',
                        },
                        {
                            type: 'list',
                            name: 'employeeRole',
                            message: 'What is the employees role?',
                            choices: employeeArray,
                        },
                        {
                            type: 'list',
                            name: 'manager',
                            message: 'Who is the employees Manager',
                            choices: managerArray,
                        },
                    ])
                        .then((answers) => {
                            const first = answers.firstName;
                            const last = answers.lastName;
                            const role = answers.employeeRole;
                            const manager = answers.manager;
                            // console.log(first, last, role, manager);
                            const addEmployeeQuery = `INSERT INTO employees (first_name, last_name, role_id, manager_id)
                             VALUES ('${first}', '${last}', ${role}, ${manager})`;
                            db.query(addEmployeeQuery, function (err, results) {
                                if (err) {
                                    console.log(err);
                                } else {
                                    console.log('');
                                    console.log('EMPLOYEE ADDED'.bold.brightCyan);
                                    console.log('');
                                }
                            });
                            initialPrompt();
                        });
                }
            });
        }
    });
}

//Update Employee Role

//View All Roles
const viewAllRoles = async () => {
    const data = await new Promise((resolve, reject) => {
        //specify id and title with table (roles) bc thrown error says 'ambiguous' column in field list
        db.query(`SELECT roles.id, roles.title, department.dep_name AS 'department', salary 
        FROM roles 
        JOIN department 
        ON roles.department_id = department.id`, (err, results) => {
            if (err) {
                reject(err)
            } else {
                resolve(results)
            }
        });
    });
    console.log('');
    console.table(data);
    initialPrompt();
};

//Add Roles

//The function will return a Promise that will resolve with the result of the function when it completes.
//View All Departments
const viewAllDepartments = async () => {
    const data = await new Promise((resolve, reject) => {
        db.query("SELECT id, dep_name AS 'name' FROM department", (err, results) => {
            if (err) {
                reject(err)
            } else {
                resolve(results)
            }
        });
    });
    console.log('');
    console.table(data);
    initialPrompt();
};

//Add Departments
const addDepartment = () => {
    inquirer.prompt([
        {
            type: 'input',
            message: 'Which Department would you like to Add?',
            name: 'department',
        },
    ])
        .then((answers) => {
          const department = answers.department;
          const deptQuery = `INSERT INTO department (dep_name) VALUES ('${department}')`;
          db.query(deptQuery, function (err, results) {
            if (err) {
              console.log(err);
            } else {
              console.log('');
              console.log('DEPARTMENT ADDED'.bold.brightCyan);
              console.log('');
            }
          });
          initialPrompt();
        });
}

//Quit application function
const quit = () => {
    console.log('');
    console.log('Bye'.bold.brightRed);
    console.log('');
}

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
                    viewAllEmployees();
                    break;
                case 'Add Employee':
                    addEmployee();
                    console.log('I chose add employees');
                    break;
                case 'Update Employee Role':
                    console.log('I chose Update Employee Role');
                    break;
                case 'View All Roles':
                    viewAllRoles();
                    console.log('I chose View All Roles');
                    break;
                case 'Add Role':
                    console.log('I chose Add Role');
                    break;
                case 'View All Departments':
                    viewAllDepartments()
                    break;
                case 'Add Department':
                    addDepartment()
                    break;
                default:
                    //disconnects database connection
                    db.end();
                    quit();
                    //terminates node
                    process.exit();
            }
        });
};


//header of app with app start function called
db.connect((err) => {
    if (err) {
      throw err;
    }
    console.log(
      colors.gray(
        `==========================================================================`
      )
    );
    console.log(``);
    console.log(colors.rainbow(figlet.textSync('            Employee')));
    console.log(colors.rainbow(figlet.textSync('                Manager')));
    console.log(``);
    console.log(
      colors.gray(
        `==========================================================================`
      )
    );
    console.log(``);
    initialPrompt();
  });

