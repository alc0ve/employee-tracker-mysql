--view all departments; changes dep_name to display as name--
SELECT id, dep_name AS 'name' FROM department

--view all employees--
SELECT
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
  employees.id ASC;

--view all roles--
SELECT id, title, department_id AS 'department', salary FROM roles

--addEmployee function--
--show role and id--
SELECT id, title FROM roles
--manager id and name--
SELECT manager_id, first_name, last_name FROM employees