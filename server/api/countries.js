const router = require('express').Router();
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// GET api/countries route
router.get('/', async (req, res, next) => {
  try {
    const countries = await prisma.country.findMany();

    res.json(countries);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
