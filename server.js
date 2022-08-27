const inquirer = require("inquirer");
const db = require("./db/connection");
require("console.table");

function viewDepartments() {
  db.query(`SELECT * FROM departments`, function (err, results) {
    console.table(results);
    startUpQuestion();
  });
}

function viewRoles() {
  db.query(`SELECT * FROM roles`, function (err, results) {
    console.table(results);
    startUpQuestion();
  });
}
function viewEmployees() {
  db.query(`SELECT * FROM employees`, function (err, results) {
    console.table(results);
    startUpQuestion();
  });
}

async function addDepartment() {
  try {
    const promptValue = await inquirer.prompt([
      {
        type: "input",
        name: "title",
        message: "What is the name of the new department?",
      },
    ]);

    const departmentData = await db
      .promise()
      .query(
        `INSERT INTO departments (name) VALUES (?)`,
        Object.values(promptValue)
      );
    startUpQuestion();
  } catch (err) {
    console.log(err);
  }
}

async function addRole() {
  try {
    const departmentData = await db
      .promise()
      .query("SELECT * FROM departments");

    const departmentChoices = departmentData[0].map(({ name, id }) => {
      return {
        name: `${name}`,
        value: id,
      };
    });
    console.log(departmentChoices);

    const promptValue = await inquirer.prompt([
      {
        type: "input",
        name: "title",
        message: "What is the title of the new role?",
      },
      {
        type: "input",
        name: "salary",
        message:
          "Without using dollar signs or commas, please enter the salary for this role.",
      },
      {
        type: "list",
        name: "department",
        message: "What department will this role fall under?",
        choices: departmentChoices,
      },
    ]);
    console.log(promptValue);
    const roleData = await db
      .promise()
      .query(
        `INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?)`,
        Object.values(promptValue)
      );
    startUpQuestion();
  } catch (err) {
    console.log(err);
  }
}

async function addEmployee() {
  try {
    const roleData = await db.promise().query("SELECT * FROM roles");
    const managerData = await db.promise().query("SELECT * FROM employees");

    const managerChoices = managerData[0].map(
      ({ id, first_name, last_name }) => {
        return {
          name: `${first_name} ${last_name}`,
          value: id,
        };
      }
    );

    console.log(managerChoices);

    const roleChoices = roleData[0].map(({ title, id }) => {
      return {
        name: title,
        value: id,
      };
    });

    const promptValue = await inquirer.prompt([
      {
        type: "input",
        name: "firstname",
        message: "What is the new employee's first name?",
      },
      {
        type: "input",
        name: "lastname",
        message: "What is the new employee's last name?",
      },
      {
        type: "list",
        name: "role",
        message: "Please select the role this person will have",
        choices: roleChoices,
      },
      {
        type: "list",
        name: "manager",
        message: "If this new employee has a manager, please select them",
        choices: managerChoices,
      },
    ]);

    console.log(promptValue);

    const employeeData = await db
      .promise()
      .query(
        `INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)`,
        Object.values(promptValue)
      );

    startUpQuestion();
  } catch (err) {
    console.log(err);
  }
}

async function updateRole() {
  try {
    const roleData = await db.promise().query("SELECT * FROM roles");
    const employeeData = await db.promise().query("SELECT * FROM employees");

    const employeeChoices = employeeData[0].map(
      ({ id, first_name, last_name }) => {
        return {
          name: `${first_name} ${last_name}`,
          value: id,
        };
      }
    );

    const roleChoices = roleData[0].map(({ title, id }) => {
      return {
        name: title,
        value: id,
      };
    });

    const promptValue = await inquirer.prompt([
      {
        type: "list",
        name: "employee",
        message: "Select the employee you wish to update.",
        choices: employeeChoices,
      },
      {
        type: "list",
        name: "role",
        message: "Please select the role this person will have",
        choices: roleChoices,
      },
    ]);

    console.log(promptValue);

    const roleUpdate = await db
      .promise()
      .query(
        `UPDATE employees SET role_id = ${promptValue.role} WHERE id = ${promptValue.employee}`
      );

    startUpQuestion();
  } catch (err) {
    console.log(err);
  }
}
function startUpQuestion() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "startup",
        message: "Which would you like to view?",
        choices: [
          "View All Departments",
          "View All Roles",
          "View All Employees",
          "Add a Department",
          "Add a Role",
          "Add an Employee",
          "Update an Employee Role",
          "QUIT",
        ],
      },
    ])
    .then((answer) => {
      console.log(answer);
      switch (answer.startup) {
        case "View All Departments":
          viewDepartments();
          break;
        case "View All Roles":
          viewRoles();
          break;
        case "View All Employees":
          viewEmployees();
          break;
        case "Add a Department":
          addDepartment();
          break;
        case "Add a Role":
          addRole();
          break;
        case "Add an Employee":
          addEmployee();
          break;
        case "Update an Employee Role":
          updateRole();
          break;
        default:
          process.exit();
      }
    });
}

startUpQuestion();
