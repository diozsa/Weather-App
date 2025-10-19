"use strict";

const { NotFoundError, BadRequestError } = require("../expressError");
const db = require("../db.js");
const Address = require("./address.js");
const {
  commonBeforeAll,
  commonBeforeEach,
  commonAfterEach,
  commonAfterAll,
  testAddressIds
} = require("./_testCommon");

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

/************************************** Save */

describe("save", function () {
  let newAddress = {
    address: "a5",
    username: "u1"
  };

  test("works", async function () {
    let address = await Address.save(newAddress);
    // console.log(address);
    expect(address).toEqual({
      ...newAddress,
      id: expect.any(Number),
    });
  });
});

/************************************** findAll */

describe("findAll", function () {

  test("works: by username with one result", async function () {
    let address = await Address.findAll("u1");
    expect(address).toEqual([
      {
        id: testAddressIds[0],
        address: "a1",
        username: "u1",
      }
    ]);
  });

  test("works: by username with multiple results", async function () {
    let address = await Address.findAll("u2");
    expect(address).toEqual([
      {
        id: testAddressIds[1],
        address: "a2",
        username: "u2",
      },
      {
        id: testAddressIds[2],
        address: "a3",
        username: "u2",
      }, {
        id: testAddressIds[3],
        address: "a4",
        username: "u2",
      },
    ]);
  });
});

/************************************** get */

describe("get", function () {
  test("works", async function () {
    let address = await Address.get(testAddressIds[0]);
    expect(address).toEqual({
      id: testAddressIds[0],
      address: "a1",
      username: "u1",
    });
  });

  test("not found if no such address", async function () {
    try {
      await Address.get(0);
      fail();
    } catch (err) {
      expect(err instanceof NotFoundError).toBeTruthy();
    }
  });
});

/************************************** remove */

describe("remove", function () {
  test("works", async function () {
    await Address.remove(testAddressIds[0]);
    const res = await db.query(
      "SELECT id FROM addresses WHERE id=$1", [testAddressIds[0]]);
    expect(res.rows.length).toEqual(0);
  });

  test("not found if no such address", async function () {
    try {
      await Address.remove(0);
      fail();
    } catch (err) {
      expect(err instanceof NotFoundError).toBeTruthy();
    }
  });
});

