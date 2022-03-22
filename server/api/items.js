const router = require('express').Router();
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// GET api/items route
router.get('/', async (req, res, next) => {
  try {
    const studies = await prisma.study.findMany();

    res.json(studies);
  } catch (err) {
    next(err);
  }
});

// POST api/items route
router.post('/', async (req, res, next) => {
  try {
    const { itemName } = req.body;
    const createdItem = await prisma.study.create({
      data: {
        title: itemName,
      },
    });

    res.json(createdItem);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
