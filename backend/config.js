"use strict";

/** Shared config for application; can be required many places. */

//manages the .env variables
require("dotenv").config();

//colored messages in the console
require("colors");

const { SECRET_key } = require("../secrets");
const SECRET_KEY = process.env.SECRET_KEY || SECRET_key;
// const SECRET_KEY = process.env.SECRET_KEY || "secret-dev";


const { API_key } = require("../secrets");
const API_KEY = process.env.API_KEY || API_key;

const PORT = +process.env.PORT || 3001;

// Use dev database, testing database, or via env var, production database
function getDatabaseUri() {
  return (process.env.NODE_ENV === "test")
      ? "weather_test"
      : process.env.DATABASE_URL || "weather";
}

// Speed up bcrypt during tests, since the algorithm safety isn't being tested
//
// In 2023 set a work factor of 12 for non-test use
const BCRYPT_WORK_FACTOR = process.env.NODE_ENV === "test" ? 1 : 12;

console.log("Weather Config:".green);
console.log("SECRET_KEY:".yellow, SECRET_KEY);
console.log("PORT:".yellow, PORT.toString());
console.log("BCRYPT_WORK_FACTOR".yellow, BCRYPT_WORK_FACTOR);
console.log("Database:".yellow, getDatabaseUri());
console.log("---");

module.exports = {
  API_KEY,
  SECRET_KEY,
  PORT,
  BCRYPT_WORK_FACTOR,
  getDatabaseUri,
};
