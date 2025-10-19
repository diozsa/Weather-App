"use strict";

const db = require("../db.js");
const User = require("../models/user");
const Address = require("../models/address");
const { createToken } = require("../tokens/tokens");

const testAddressIds = [];

async function commonBeforeAll() {
  // noinspection SqlWithoutWhere
  await db.query("DELETE FROM users");
  // noinspection SqlWithoutWhere
  await db.query("DELETE FROM addresses");

  
  await User.register({
    username: "u1",
    password: "password1"
  });
  await User.register({
    username: "u2",
    password: "password2"
  });
  

  testAddressIds[0] = (await Address.save(
    {
      address: "a1",
      username: "u1"
    })).id;
  testAddressIds[1] = (await Address.save(
    {
      address: "a2",
      username: "u2"
    })).id;
  testAddressIds[2] = (await Address.save(
      {
        address: "a3",
        username: "u2"
    })).id;
  testAddressIds[3] = (await Address.save(
    {
      address: "a4",
      username: "u2"
    })).id;
  
  
  // await Company.create(
  //   {
  //     handle: "c2",
  //     name: "C2",
  //     numEmployees: 2,
  //     description: "Desc2",
  //     logoUrl: "http://c2.img",
  //   });
  // await Company.create(
  //   {
  //     handle: "c3",
  //     name: "C3",
  //     numEmployees: 3,
  //     description: "Desc3",
  //     logoUrl: "http://c3.img",
  //   });

  // testJobIds[0] = (await Job.create(
  //   { title: "J1", salary: 1, equity: "0.1", companyHandle: "c1" })).id;
  // testJobIds[1] = (await Job.create(
  //   { title: "J2", salary: 2, equity: "0.2", companyHandle: "c1" })).id;
  // testJobIds[2] = (await Job.create(
  //   { title: "J3", salary: 3, /* equity null */ companyHandle: "c1" })).id;

  // await User.register({
  //   username: "u1",
  //   firstName: "U1F",
  //   lastName: "U1L",
  //   email: "user1@user.com",
  //   password: "password1",
  //   isAdmin: false,
  // });
  // await User.register({
  //   username: "u2",
  //   firstName: "U2F",
  //   lastName: "U2L",
  //   email: "user2@user.com",
  //   password: "password2",
  //   isAdmin: false,
  // });
  // await User.register({
  //   username: "u3",
  //   firstName: "U3F",
  //   lastName: "U3L",
  //   email: "user3@user.com",
  //   password: "password3",
  //   isAdmin: false,
  // });

  //await User.applyToJob("u1", testJobIds[0]);
}

async function commonBeforeEach() {
  await db.query("BEGIN");
}

async function commonAfterEach() {
  await db.query("ROLLBACK");
}

async function commonAfterAll() {
  await db.end();
}


const u1Token = createToken({ username: "u1" });
const u2Token = createToken({ username: "u2" });

module.exports = {
  commonBeforeAll,
  commonBeforeEach,
  commonAfterEach,
  commonAfterAll,
  testAddressIds,
  u1Token,
  u2Token,
};
