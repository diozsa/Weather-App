"use strict";

const db = require("../db");
const { NotFoundError } = require("../expressError");


/** Related functions for addresses table. */

class Address {

  /** Saves an address (from data), updates db, returns address data.
   *
   * data should be { address, username }
   * Returns { id, address, username }
   **/

  static async save(data) {
    const result = await db.query(
      `INSERT INTO addresses (address, username)
       VALUES (?, ?)`,
      [data.address, data.username]
    );

    // query the inserted row
    const selectResult = await db.query(
      `SELECT id, address, username
       FROM addresses
       WHERE address = ? AND username = ?`,
      [data.address, data.username]
    );

    const address = selectResult[0][0]; // mysql2 returns rows in selectResult[0]

    if (!address) {
      throw new Error("Failed to retrieve inserted address");
    }

    return address;
  }

  /*********** Find all addresses per username
   *
   * Returns [{ id, address, username }, ...]
   * */

  static async findAll(username) {
    const result = await db.query(
                 `SELECT *
                  FROM addresses 
                  WHERE username = ?`,
      [username]
    );
    
    return result[0];
  }


  /******** Get adress by ID - get(id) 
   * Given an address id, return address data.
   *
   * Returns { id, address, username }
   *
   * Throws NotFoundError if not found.
   **/

  static async get(id) {
    const addressRes = await db.query(
           `SELECT *
            FROM addresses
            WHERE id = ?`,
      [id]
    );

    const address = addressRes[0][0];

    if (!address) throw new NotFoundError(`Invalid address: ${id}`);

    return address;
  }


  /******* Delete given address from database; returns undefined.
   *
   * Throws NotFoundError if address is not found.
   **/

  static async remove(id) {
    const result = await db.query(
      `DELETE
       FROM addresses
       WHERE id = ?`,
      [id]
    );

    const affectedRows = result[0].affectedRows; // Check if any rows were deleted

    if (affectedRows === 0) throw new NotFoundError(`Address not found: ${id}`);
  }
}
  

module.exports = Address;