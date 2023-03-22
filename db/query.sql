--view all departments; changes dep_name to display as name--
SELECT id, dep_name AS 'name' FROM department

--view all roles--
SELECT id, title, department_id AS 'department', salary FROM roles

--addEmployee function--
--show role and id--
SELECT id, title FROM roles
--manager id and name--
SELECT manager_id, first_name, last_name FROM employees