const bcrypt = require("bcrypt");
const { BCRYPT_WORK_FACTOR } = require("../config");
const db = require("../db.js");

const testAddressIds = [];

async function commonBeforeAll() {
  // noinspection SqlWithoutWhere
  await db.query("DELETE FROM addresses");

  // noinspection SqlWithoutWhere
  await db.query("DELETE FROM users");  

  await db.query(`
        INSERT INTO users(username, password)
        VALUES ('u1', $1),
               ('u2', $2)
        RETURNING username`,
    [
      await bcrypt.hash("password1", BCRYPT_WORK_FACTOR),
      await bcrypt.hash("password2", BCRYPT_WORK_FACTOR),
    ]);
  
  const resultsAddresses = await db.query(`
    INSERT INTO addresses(address, username)                    
    VALUES ('a1', 'u1'),
           ('a2', 'u2'),
           ('a3', 'u2'),
           ('a4', 'u2')
    RETURNING id`);
  testAddressIds.splice(0, 0, ...resultsAddresses.rows.map(a => a.id));
  console.log("IDs are " + testAddressIds);
} // end

async function commonBeforeEach() {
  await db.query("BEGIN");
}

async function commonAfterEach() {
  await db.query("ROLLBACK");
}

async function commonAfterAll() {
  await db.end();
}

module.exports = {
  commonBeforeAll,
  commonBeforeEach,
  commonAfterEach,
  commonAfterAll,
  testAddressIds,
};