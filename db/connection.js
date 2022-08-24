const mysql = require("mysql2"); 

const db = mysql.createConnection(
    {
        host: "localhost",
        user: "root",
        password: "",
        database: "roster",
},
console.log("Connected to the roster database.")
);

module.exports = db;