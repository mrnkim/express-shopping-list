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


/** POST /items: add item*/

router.post("/", function (req, res) {
  if (req.body === undefined) throw new BadRequestError();
  const newItem = { name: req.body.name, price: req.body.price };
  const result = {added: newItem}
  items.push(newItem)
  return res.json(result);
});

//  /**get a list of items */ TODO: use find method
router.get("/:name", function (req, res) {
  for (let item of items) {
    if (item.name === req.params.name) {
      return res.json(item);
    }
  }
});

/** PATCH /:name update item*/

router.patch("/:name", function(req,res){
  if (req.body === undefined) throw new BadRequestError();
  let patchItem;
  for (let item of items) {
    if (item.name === req.params.name) {
      patchItem = item;
    }}
    patchItem.name = req.body.name;
    patchItem.price = req.body.price;

  const result = {updated: patchItem};
  return res.json(result);
})

/**DELETE /:name delete item */
router.delete("/:name", function(req,res){
  for (let item of items){
    if (item.name === req.params.name){
      let deleteIndex = items.indexOf(item)
      items.splice(deleteIndex,1)
    }
  }
  return res.json({ message: "Deleted" })
})

module.exports = router;