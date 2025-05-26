const express = require('express');
const courseController = require('../controllers/courseController');

const router = express.Router();

router.get('/', courseController.getCourses);
router.get('/search', courseController.searchCourses);

module.exports = router;