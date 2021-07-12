const router = require('express').Router();
const { Item } = require('../db/model/index');

// GET api/items route
router.get('/', async (req, res, next) => {
  try {
    const itemList = await Item.findAll();
    res.json(itemList);
  } catch (err) {
    next(err);
  }
});

// POST api/items route
router.post('/', async (req, res, next) => {
  try {
    const { itemName } = req.body;
    const createdItem = await Item.create({ name: itemName });

    res.json(createdItem);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
