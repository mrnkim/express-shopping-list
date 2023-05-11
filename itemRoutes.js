"use strict";
/** Routes for shopping list app. */

const express = require("express");

const { items } = require("./fakeDb");
const router = new express.Router();
const { NotFoundError, BadRequestError } = require("./expressError");

/** GET /items: get list of items */
router.get("/", function (req, res) {
  return res.json({ items: items });
});

/** POST /items: add item*/

router.post("/", function (req, res) {
  if (req.body === undefined) throw new BadRequestError();
  const newItem = { name: req.body.name, price: req.body.price };
  items.push(newItem);

  return res.json({ added: newItem });
});

/**get a list of items */
router.get("/:name", function (req, res) {
  if (items.length === 0) {
    throw new NotFoundError();
  }

  for (let item of items) {
    if (item.name === req.params.name) {
      return res.json(item);
    }

    throw new NotFoundError();
  }
});

/** PATCH /:name update item*/

router.patch("/:name", function (req, res) {
  if (req.body === undefined) throw new BadRequestError();

  let itemToPatch;
  for (let item of items) {
    if (item.name === req.params.name) {
      itemToPatch = item;
    }
  }

  itemToPatch.name = req.body.name;
  itemToPatch.price = req.body.price;

  return res.json({ updated: itemToPatch });
});

/**DELETE /:name delete item */
router.delete("/:name", function (req, res) {
  for (let item of items) {
    if (item.name === req.params.name) {
      let deleteIndex = items.indexOf(item);
      items.splice(deleteIndex, 1);
    } else {
      throw new NotFoundError();
    }
  }
  return res.json({ message: "Deleted" });
});

module.exports = router;
