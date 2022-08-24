USE roster;

INSERT INTO departments (name)
VALUES
("Sales"),
("Engineering"),
("Finance"),
("Legal");

INSERT INTO roles (title, salary, department_id)
VALUES
("Area Manager", 90000, 1),
("Sales Lead", 85000, 1),
("Salesperson", 75000, 1),
("Senior Software Engineer", 130000, 2),
("Software Engineer", 100000, 2),
("IT Assistant", 90000, 2),
("Head Accountant", 450000, 3),
("Accountant", 200000, 3),
("Office Manager", 65000, 3),
("Legal Team Lead", 400000, 4),
("Lawyer", 250000, 4),
("Paralegal", 50000, 4);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES
("Jon", "Johnson", 1, NULL),
("Greg", "Gregson", 2, 1),
("Jeffrey", "Jefferson", 3, 2),
("Patti", "Patterson", 3, 2),
("Sammy", "Samuels", 3, 2),
("Tiff", "Jenkins", 4, NULL),
("Molly", "Dunn", 5, 6),
("David", "Pollock", 5, 6),
("Duncan", "Idaho", 6, 7),
("Reed", "Richards", 7, NULL),
("Tony", "Stark", 8, 10),
("Bruce", "Banner", 9, 11),
("Harvey", "Dent", 10, NULL),
("Harley", "Quinzel", 11, 13),
("Edward", "Nigma", 12, 14);

