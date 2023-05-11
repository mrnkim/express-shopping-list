const request = require("supertest");

const app = require("./app");
const db = require("./fakeDb");
console.log("db= ", db);
beforeEach(function () {
  console.log("db.items= ", db.items);
  db.items.push({
    name: "popsicle",
    price: "$3",
  });
});

afterEach(function () {
  db.items = [];
});

test("valid", async function () {
  const resp = await request(app).get("/items");
  expect(resp.body).toEqual({ items: [{ name: "popsicle", price: "$3" }] });
});

describe("GET /items/:name", function () {
  test("valid", async function () {
    const resp = await request(app).get("/items/popsicle");
    console.log("resp.body= ", resp.body);
    expect(resp.body).toEqual({ name: "popsicle", price: "$3" });
  });

  // test("invalid", async function () {
  //   const resp = await request(app).get("/items/chocolate");
  //   expect(resp.status).toEqual(404);
  // });
});

// test("DELETE /users", async function () {
//   const resp = await request(app).delete("/users/1");
//   expect(resp.body).toEqual({ message: "Deleted" });
//   expect(db.User.all().length).toEqual(0);
// });
