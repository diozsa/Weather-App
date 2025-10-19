"use strict";

/** Routes for users. */


const express = require("express");
const { ensureCorrectUser } = require("../middleware/auth");
const User = require("../models/user");

const router = express.Router();


/** DELETE /[username]  =>  { deleted: username }
 *
 * Authorization required: same-user-as-:username
 **/

router.delete("/:username", ensureCorrectUser, async function (req, res, next) {
  try {
    await User.remove(req.params.username);
    return res.json({ deleted: req.params.username });
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
