const inquirer = require('inquirer');
const mySQL = require('mysql2');
const cTable = require('console.table');
const colors = require('colors');
const figlet = require('figlet');
// const { query } = require('./config/connection');
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
                            db.query(addEmployeeQuery, (err, results) => {
                                if (err) {
                                    console.log(err);
                                } else {
                                    console.log('');
                                    console.log('EMPLOYEE ADDED'.bold.brightCyan);
                                    console.log('');
                                };
                            });
                            initialPrompt();
                        });
                };
            });
        };
    });
}

//Update Employee Role
const updateEmployeeRole = () => {
    //get id and and name from employees; choose what employee's role will be updated
    db.query(`SELECT employees.id, employees.first_name, employees.last_name FROM employees`, (err, results) => {
        if (err) {
            console.log(err);
        } else {
            let empQueryArray = results.map((obj) => {
                return {
                    //taking values from query and renaming the keys
                    value: obj.id,
                    name: obj.first_name + ' ' + obj.last_name
                };
            });
            // console.log(empQueryArray);
            //query to get roles to choose to update to; need id and role title
            db.query(`SELECT id, title FROM roles`, async (err, results) => {
                if (err) {
                    console.log(err);
                } else {
                    let roleQueryArray = results.map((obj) => {
                        return {
                            value: obj.id,
                            name: obj.title
                        };
                    });
                    // console.log(roleQueryArray);
                    await inquirer.prompt([
                        {
                            type: 'list',
                            name: 'employeeName',
                            message: `Which employee's role do you want to update?`,
                            choices: empQueryArray,
                          },
                          {
                            type: 'list',
                            name: 'roleName',
                            message: 'Which role do you want to assign the selected employee?',
                            choices: roleQueryArray,
                          },
                    ])
                    .then((answers) => {
                        const empName = answers.employeeName;
                        const roleName = answers.roleName;
        
                        db.query(`UPDATE employees SET role_id = ${roleName} WHERE id = ${empName}`, (err, results) => {
                            if (err) {
                                console.log(err);
                            } else {
                                console.log('');
                                console.log('EMPLOYEE ROLE UPDATED'.bold.brightCyan);
                                console.log('');
                            };
                        });
                        initialPrompt();
                    });
                };
            });
        };
    });
}

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
const addRole = () => {
    //show id and department name
    db.query("SELECT id, dep_name FROM department", async (err, results) => {
        if (err) {
            console.log(err);
        } else {
            let deptArray = results.map((obj) => {
                return {
                    value: obj.id,
                    name: obj.dep_name
                };
            });
            // console.log(deptArray);
            //prompts for adding role
            await inquirer.prompt([
                {
                    type: 'input',
                    name: 'roleTitle',
                    message: 'What Role would you like to add?',
                },
                {
                    type: 'input',
                    name: 'roleSalary',
                    message: 'What is the salary of the Role?',
                },
                {
                    type: 'list',
                    name: 'roleDept',
                    message: 'What is the Department for the Role?',
                    choices: deptArray,
                },
            ])
                //using answers put in
                .then((answers) => {
                    const title = answers.roleTitle;
                    const salary = answers.roleSalary;
                    const department = answers.roleDept;
                    db.query(`INSERT INTO roles (title, salary, department_id) VALUES ('${title}', ${salary}, ${department})`,
                        function (err, results) {
                            if (err) {
                                console.log(err);
                            } else {
                                console.log('');
                                console.log('ROLE ADDED'.bold.brightCyan);
                                console.log('');
                            }
                        });
                    initialPrompt();
                });
        }
    });
}

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
                    break;
                case 'Update Employee Role':
                    updateEmployeeRole();
                    break;
                case 'View All Roles':
                    viewAllRoles();
                    break;
                case 'Add Role':
                    addRole();
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
                    //function to show Bye
                    quit();
                    //terminates node
                    process.exit();
            }
        });
};


//header of app with app start function called
db.connect((err) => {
    if (err) {
      console.log(err);
    }
    console.log(
      colors.gray(
        `==========================================================================`
      )
    );
    console.log(``);
    console.log(colors.gray(figlet.textSync('            Employee')));
    console.log(colors.gray(figlet.textSync('                Manager')));
    console.log(``);
    console.log(
      colors.gray(
        `==========================================================================`
      )
    );
    console.log(``);
    initialPrompt();
  });

