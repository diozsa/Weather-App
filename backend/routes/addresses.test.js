"use strict";

const request = require("supertest");

const app = require("../app");

const {
  commonBeforeAll,
  commonBeforeEach,
  commonAfterEach,
  commonAfterAll,
  testAddressIds,
  u1Token,
  u2Token,
} = require("./_testCommon");

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

/************************************** POST /addresses */

describe("POST /addresses", function () {

  test("works for logged in users", async function () {
    const resp = await request(app)
      .post(`/addresses`)
      .send({
        username: "u2",
        address: "a5"
      })
      .set("authorization", `Bearer ${u2Token}`);
    expect(resp.statusCode).toEqual(201);
  });

  test("bad request with missing data", async function () {
    const resp = await request(app)
      .post(`/addresses`)
      .send({
        address: "a1",
      })
      .set("authorization", `Bearer ${u1Token}`);
    expect(resp.statusCode).toEqual(400);
  });

  // for the future, to incorporate same-user check, if needed,
  // using ensureCorrectUser and use params in the request

  // test("bad request with invalid data", async function () {
  //   const resp = await request(app)
  //     .post(`/addresses`)
  //     .send({
  //       username: "u1",
  //       address: "a1"
  //     })
  //     .set("authorization", `Bearer ${u2Token}`);
  //   expect(resp.statusCode).toEqual(400);
  // });

});

/************************************** GET /addresses */

describe("GET /addresses", function () {
  test("works for logged in user", async function () {
    const resp = await request(app)
      .get(`/addresses/u2`)
      .set("authorization", `Bearer ${u2Token}`)
    expect(resp.body).toEqual({
      addresses: [
        {
          id: testAddressIds[1],
          address: "a2",
          username: "u2"
        },
        {
          id: testAddressIds[2],
          address: "a3",
          username: "u2"
        },
        {
          id: testAddressIds[3],
          address: "a4",
          username: "u2"
        },
      ],
    },
    );
  });

  test("fails if not logged in", async function () {
    const resp = await request(app)
      .get(`/addresses/u2`)
    expect(resp.statusCode).toEqual(401);
  });
});

/******************************** GET /addresses/:username/:id */

describe("GET /addresses/:username/:id", function () {
  test("works for correct user", async function () {
    console.log(testAddressIds[0]);
    const resp = await request(app)
      .get(`/addresses/u1/${testAddressIds[0]}`)
      .set("authorization", `Bearer ${u1Token}`);
    expect(resp.body).toEqual({
      address: {
        id: testAddressIds[0],
        address: "a1",
        username: "u1"
        },
    });

  }); test("fails for incorrect user", async function () {
    console.log(testAddressIds[0]);
    const resp = await request(app)
      .get(`/addresses/u1/${testAddressIds[0]}`)
      .set("authorization", `Bearer ${u2Token}`);
    expect(resp.statusCode).toEqual(401);
  });

  test("not found for no such address", async function () {
    const resp = await request(app)
      .get(`/addresses/u1/0`)
      .set("authorization", `Bearer ${u1Token}`);
;
    expect(resp.statusCode).toEqual(404);
  });
});


/********************************** DELETE /addresses/:id */

describe("DELETE /addresses/:username/:id", function () {
  test("works for same-user", async function () {
    const resp = await request(app)
      .delete(`/addresses/u1/${testAddressIds[0]}`)
      .set("authorization", `Bearer ${u1Token}`);
    expect(resp.body).toEqual({ deleted: testAddressIds[0] });
  });

  test("fails for not same-user", async function () {
    const resp = await request(app)
      .delete(`/addresses/u2/${testAddressIds[0]}`)
      .set("authorization", `Bearer ${u1Token}`);
    expect(resp.statusCode).toEqual(401);
  });

  test("unauth for anon", async function () {
    const resp = await request(app)
      .delete(`/addresses/u1/${testAddressIds[0]}`);
    expect(resp.statusCode).toEqual(401);
  });

  test("not found for no such address", async function () {
    const resp = await request(app)
      .delete(`/addresses/u1/0`)
      .set("authorization", `Bearer ${u1Token}`);
    expect(resp.statusCode).toEqual(404);
  });
});