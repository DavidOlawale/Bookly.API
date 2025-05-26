const express = require('express');
const courseRoutes = require('./courses');

const router = express.Router();

router.use('/courses', courseRoutes);

module.exports = router;