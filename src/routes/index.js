const express = require('express');
const courseRoutes = require('./courses');
const orderRoutes = require('./orders');

const router = express.Router();

router.use('/courses', courseRoutes);
router.use('/orders', orderRoutes);

module.exports = router;