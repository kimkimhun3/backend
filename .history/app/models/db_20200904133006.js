const mysql = require("mysql");
const dbConfig = require("../config/db.config.js");

// Create a connection to the database
const connection = mysql.createConnection({
  host: dbConfig.host,
  user: dbConfig.user,
  password: dbConfig.password,
  database: dbConfig.database,
  port: dbConfig.port
  
});

// open the MySQL connection
connection.connect((err) => {
  if (err) throw err;
  console.log("Successfully connected to the database.");
});

module.exports = connection;
