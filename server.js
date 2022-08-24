const inquirer = require("inquirer");
const mysql = require("mysql2"); 
require("console.table");

const db = mysql.createConnection(
    {
        host: "localhost",
        user: "root",
        password: "",
        database: "roster",
},
console.log("Connected to the roster database.")
);


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
    
//         db.query(`INSERT INTO departments (name) VALUES (?)`, params, (err, result) => {
//         })
// };

// function addRole()  {
   
//         const sql = `INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?)`;
        
// };

// function addEmployee() {
    
//         const sql = `INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)`;
        
// };

// updateRole() = function () {
//     router.put("/employee/:id", (req, res) => {
//         const sql = `UPDATE employees SET role = ? WHERE id = ?`;
//         const params = [req.body.role, req.params.id];
//         db.query(sql, params, (err, result) => {
//             if(err) {
//                 res.status(400).json({error: err.message});
//             } else if (!result.affectedRows) {
//                 res.json({
//                     message: "Employee not found."
//                 });
//             } else {
//                 res.json({
//                     message: "Success.",
//                     data: req.body,
//                     changes: result.affectedRows
//                 });
//                 startUpQuestion();
//             }
//         });
//     });
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
    .then(({answer}) => {
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
