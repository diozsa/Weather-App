"use strict";

/** Database setup */
const mysql = require("mysql2/promise");
const { getDatabaseUri } = require("./config");
const {DB_USER, DB_PASSWORD} = require("../secrets.js")

// Determine database name
const databaseName = process.env.NODE_ENV === "test" ? "weather_test" : getDatabaseUri();

// Create a connection pool
const db = mysql.createPool({
  host: "localhost",
  user: DB_USER,    // MariaDB user
  password: DB_PASSWORD,
  database: databaseName,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

module.exports = db;