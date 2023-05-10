/** Routes for sample app. */

const express = require("express");

const {items} = require("./fakeDb");
const router = new express.Router();

/** GET /items: get list of items */
router.get("/", function (req, res) {
  return res.json({items:items});
});
// items = [ {name: "item", price: num},{} ]

/** POST /items: add item*/
/** DELETE /users/[id]: delete user, return {message: Deleted} */
router.delete("/:id", function (req, res) {
  db.User.delete(req.params.id);
  return res.json({ message: "Deleted" });
});

module.exports = router;