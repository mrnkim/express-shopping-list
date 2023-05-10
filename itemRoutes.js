/** Routes for sample app. */

const express = require("express");

const { items } = require("./fakeDb");
const router = new express.Router();
const {
  ExpressError,
  NotFoundError,
  UnauthorizedError,
  BadRequestError,
  ForbiddenError,
} = require("./expressError");

/** GET /items: get list of items */
router.get("/", function (req, res) {
  return res.json({ items: items });
});
// items = [ {name: "item", price: num},{} ]

/** POST /items: add item*/

router.post("/", function (req, res) {
  if (req.body === undefined) throw new BadRequestError();
  const newItem = { name: req.body.name, price: req.body.price };
  items.push(newItem);
  return res.json(newItem);
});

router.get("/:name", function (req, res) {
  for (let item of items) {
    if (item.name === req.params.name) {
      return res.json(item);
    }
  }
});



/** DELETE /users/[id]: delete user, return {message: Deleted} */
router.delete("/:id", function (req, res) {
  db.User.delete(req.params.id);
  return res.json({ message: "Deleted" });
});

module.exports = router;
