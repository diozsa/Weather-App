"use strict";

/** Routes for addresses. */

const jsonschema = require("jsonschema");
const express = require("express");
const { BadRequestError } = require("../expressError");
const { ensureCorrectUser, ensureLoggedIn } = require("../middleware/auth");
const Address = require("../models/address");
const addressSchema = require("../schemas/address.json");
const router = express.Router();


/** GET / {data} => {processed_data}
 * 
 * Gets data from external weather API
 * 
 * NO autho required
 */

// router.get('/data', async function (req, res, next) {
//   try {
//     const response = await axios.get(`${API_BASE_URL}${API_KEY}`);
//     const data = response.data; // the response data from the API
//     let { currentConditions } = data;

//     res.send(currentConditions); // send the response data to the client 
//   } catch (err) {
//     return next(err);
//   }
// })

/** POST / Add location data { location } => { location }
 *
 * location should be { address, username }
 *
 * Returns { id, address, username }
 *
 * Authorization required: loggen in and correct user
 */

router.post("/", ensureLoggedIn, async function (req, res, next) {
  try {
    const validator = jsonschema.validate(req.body, addressSchema);
    if (!validator.valid) {
      const errs = validator.errors.map(e => e.stack);
      throw new BadRequestError(errs);
    }

    const address = await Address.save(req.body);
    return res.status(201).json({ address });
  } catch (err) {
    return next(err);
  }
});


/** GET / find all addresses per username =>
 *   { [ { id, address, username }, ...] }

 * Authorization required: logged in
 */

router.get("/:username", ensureLoggedIn, async function (req, res, next) {
  const q = req.params;

  try {
    const validator = jsonschema.validate(q, addressSchema);

    if (!validator.valid) {
      const errs = validator.errors.map(e => e.stack);
      throw new BadRequestError(errs);
    }
    const addresses = await Address.findAll(q.username);

    return res.json({ addresses });
  } catch (err) {
    return next(err);
  }
});


/** GET /[id] => { address }
 *
 * Returns { id, address, username }
 *
 * Authorization required: logged in
 */

router.get("/:username/:id", ensureCorrectUser, async function (req, res, next) {

  try {
    const address = await Address.get(req.params.id);
    return res.json({ address });
  } catch (err) {
    return next(err);
  }
});


/** DELETE /[id]  =>  { deleted: id }
 *
 * Authorization required: loggen in
 */

router.delete("/:username/:id", ensureCorrectUser, async function (req, res, next) {
  try {
    await Address.remove(req.params.id);
    return res.json({ deleted: +req.params.id });
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
