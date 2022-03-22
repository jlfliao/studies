const router = require('express').Router();
<<<<<<< HEAD
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
=======
const { Item } = require('../db/model/index');
>>>>>>> e4fcf42e56e667dd3b6e6f12d90a51f0f9e313fd

// GET api/items route
router.get('/', async (req, res, next) => {
  try {
<<<<<<< HEAD
    const studies = await prisma.study.findMany();

    res.json(studies);
=======
    const itemList = await Item.findAll();
    res.json(itemList);
>>>>>>> e4fcf42e56e667dd3b6e6f12d90a51f0f9e313fd
  } catch (err) {
    next(err);
  }
});

// POST api/items route
router.post('/', async (req, res, next) => {
  try {
    const { itemName } = req.body;
<<<<<<< HEAD
    const createdItem = await prisma.study.create({
      data: {
        title: itemName,
      },
    });
=======
    const createdItem = await Item.create({ name: itemName });
>>>>>>> e4fcf42e56e667dd3b6e6f12d90a51f0f9e313fd

    res.json(createdItem);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
