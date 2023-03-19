INSERT INTO department (id, dep_name)
VALUES (1, "Sales"),
       (2, "Engineering"),
       (3, "Finance"),
       (4, "Legal");

INSERT INTO roles (id, title, salary, department_id)
VALUES (1, "Sales Lead", 110000, 1),
       (2, "Salesperson", 80000, 1),
       (3, "Engineering Manager", 180000, 2),
       (4, "Software Engineer", 150000, 2),
       (5, "Data Analyst", 100000, 2),
       (6, "Account Manager", 120000, 3),
       (7, "Accountant", 100000, 3),
       (8, "Legal Team Lead", 170000, 4),
       (9, "Lawyer", 120000, 4);

INSERT INTO employees (id, first_name, last_name, role_id, manager_id)
VALUES (1, "Lacey", "Angarita", 8, NULL),
       (5, "Peter", "Parker", 3, NULL),
       (8, "Tony", "Stark", 3, 5),
       (9, "Thor", "OdinSon", 1, NULL),
       (16, "Obiwan", "Kenobi", 9, 1),
       (17, "Darth", "Vader", 6, NULL);