const inquirer = require("inquirer");
const express = require("express");
const router = express.Router();

(startUpQuestion) => {
  inquirer.prompt([
    {
      type: "list",
      name: startup,
      message: "Which would you like to view?",
      choices: [
        "View All Departments",
        "View All Roles",
        "View All Employees",
        "Add a Department",
        "Add a Role",
        "Add an Employee",
        "Update an Employee Role",
      ],
    },
  ]);
  switch (result.startup) {
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
  }
};

viewDepartments() = function () {
router.get("/departments", (req, res) => {
    const sql = `SELECT * FROM deparments`;
    db.query(sql, (err, rows) => {
        if(err) {
            res.status(500).json({error: err.message});
            return;
        }
        res.json({
            message:"Success.",
            data: rows
        });
    });
});
};

viewRoles() = function () {
    router.get("/roles", (req, res) => {
        const sql = `SELECT * FROM roles`;
        db.query(sql, (err, rows) => {
            if(err) {
                res.status(500).json({error: err.message});
                return;
            }
            res.json({
                message: "Success.",
                data: rows
            });
        });
    });
};
viewEmployees() = function () {
    router.get("/employees", (req, res) => {
        const sql = `SELECT * FROM employees`;
        db.query(sql, (err, rows) => {
            if(err) {
                res.status(500).json({error: err.message});
                return;
            }
            res.json({
                message:"Success.",
                data: rows
            });
        });
    });
};

addDepartment() = function () {
    router.post("/departments", ({body}, res) => {
        const sql = `INSERT INTO departments (name) VALUES (?)`;
        const params = [body.name];
        db.query(sql, params, (err, result) => {
            if(err) {
                res.status(400).json({error: err.message});
                return;
            }
            res.json({
                message: "Success.",
                data: body
            });
        });
    });
};

addRole() = function () {
    router.post("/roles", ({body}, res) => {
        const sql = `INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?)`;
        const params = [body.title, body.salary, body.department_id];
        db.query(sql, params, (err, result) => {
            if(err) {
                res.status(400).json({error: err.message});
                return;
            }
            res.json({
                message: "Success.",
                data: body
            });
        });
    });
};

addEmployee() = function () {
    router.post("/employees", ({body}, res) => {
        const sql = `INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)`;
        const params = [body.first_name, body.last_name, body.role_id, body.manager_id];
        db.query(sql, params, (err, result) => {
            if(err) {
                res.status(400).json({error: err.message});
                return;
            }
            res.json({
                message: "Success.",
                data: body
            });
        });
    });
};

updateRole() = function () {
    router.put("/employee/:id", (req, res) => {
        const sql = `UPDATE employees SET role = ? WHERE id = ?`;
        const params = [req.body.role, req.params.id];
        db.query(sql, params, (err, result) => {
            if(err) {
                res.status(400).json({error: err.message});
            } else if (!result.affectedRows) {
                res.json({
                    message: "Employee not found."
                });
            } else {
                res.json({
                    message: "Success.",
                    data: req.body,
                    changes: result.affectedRows
                });
            }
        });
    });
};
