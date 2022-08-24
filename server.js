const inquirer = require("inquirer");
const db = require("./db/connection");
require("console.table");

function viewDepartments() {
    db.query(`SELECT * FROM departments`, function (err, results) {
        console.table(results);
        startUpQuestion();
    });
};

function viewRoles() {
    db.query(`SELECT * FROM roles`, function (err, results) {
        console.table(results);
        startUpQuestion();
    });
};
function viewEmployees() {
        db.query(`SELECT * FROM employees`, function (err, results) {
            console.table(results);
            startUpQuestion();
        });
};

// function addDepartment()  {
//     inquirer.prompt([
//         {
//             type: "input",
//             name: "department",
//             message: "What is the name of the department you are adding?",
//         },        
//     ])
//         db.query(`INSERT INTO departments (name) VALUES (?)`, params, (err, result) => {
//         })
// };

// function addRole()  {
//    inquirer.prompt([
//     {
//         type: "input",
//         name: "title",
//         message: "What is the title of the new role?"
//     },
//     {
//         type: "input",
//         name: "salary",
//         message: "Without using dollar signs or commas, please enter the salary for this role."
//     },
//     {
//         type: "list",
//         name: "department",
//         message: "What department will this role fall under?",
//         choices: ["Sales", "Engineering", "Finance", "Legal"]
//     }
//    ])
//       db.query(`INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?)`, function (err, results) {
//         const params = results.map
//       })  ;
        
// };

// function addEmployee() {
//     inquirer.prompt ([
//         {
//             type: "input",
//             name: "firstname",
//             message: "What is the new employee's first name?"
//         },
//         {
//             type: "input",
//             name: "lastname",
//             message: "What is the new employee's last name?"
//         },
//         {
//             type: "list",
//             name: "role",
//             message: "Please select the role this person will have",
//             choices: []
//         }
//     ])
//         const sql = `INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)`;
        
// };

// updateRole() = function () {
    
//         const sql = `UPDATE employees SET role = ? WHERE id = ?`;
//         const params = [req.body.role, req.params.id];
//         db.query(sql, params, (err, result) => {
            
//                 startUpQuestion();
//             })
// };
function startUpQuestion() {
    inquirer.prompt([
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
          "QUIT"
        ],
      },
    ])
    .then((answer) => {
      switch (answer) {
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
