"use strict";

const db = require("../db");
const bcrypt = require("bcrypt");
const {
  NotFoundError,
  BadRequestError,
  UnauthorizedError,
} = require("../expressError");

const { BCRYPT_WORK_FACTOR } = require("../config.js");


/** Related functions for users table. */

class User {
  
  /** Authenticate user with username, password, returns { username }
   *
   * Throws UnauthorizedError is user not found or wrong password.
   **/

  static async authenticate(username, password) {
    // try to find the user first
    const result = await db.query(
          `SELECT username, password
           FROM users
           WHERE username = ?`,
        [username],
    );
    console.log('Query result:', result); // Debug output
    const user = result[0][0];
    if (user) {
      // compare hashed password to a new hash from password
      const isValid = await bcrypt.compare(password, user.password);
      if (isValid === true) {
        delete user.password;
        return user;
      }
    }

    throw new UnauthorizedError("Invalid username/password");
  }

  /************** Register user with data; returns { username }
   *
   * Throws BadRequestError on duplicates.
   **/

  static async register({ username, password }) {
    const duplicateCheck = await db.query(
          `SELECT username
           FROM users
           WHERE username = ?`,
        [username],
    );

    if (duplicateCheck[0][0]) {
      throw new BadRequestError(`Duplicate username: ${username}`);
    }
 
    const hashedPassword = await bcrypt.hash(password, BCRYPT_WORK_FACTOR);

  //   const result = await db.query(
  //         `INSERT INTO users
  //          (username, password)
  //          VALUES (?, ?)
  //          RETURNING username`,
  //       [username, hashedPassword],
  //   );

  //   const user = result[0][0];
  //   return user;
  // }
    await db.query(
      `INSERT INTO users
       (username, password)
       VALUES (?, ?)`,
      [username, hashedPassword]
    );

    // Since MariaDB doesn't support RETURNING, return the username directly
    return { username };
  }

  /**************** Delete given user; returns undefined. */

//   static async remove(username) {
//     let result = await db.query(
//           `DELETE
//            FROM users
//            WHERE username = ?
//            RETURNING username`,
//         [username],
//     );
//     const user = result[0][0];

//     if (!user) throw new NotFoundError(`No user: ${username}`);
//   }
// }
  static async remove(username) {
    const result = await db.query(
      `DELETE
       FROM users
       WHERE username = ?`,
      [username]
    );

    const affectedRows = result[0].affectedRows; // Check if any rows were deleted

    if (affectedRows === 0) throw new NotFoundError(`No user: ${username}`);
  }
}

module.exports = User;
