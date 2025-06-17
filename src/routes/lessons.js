const express = require('express');
const lessonController = require('../controllers/lessonController');

const router = express.Router();

router.get('/', lessonController.getAllLessons);
router.put('/:id', lessonController.updateLesson);

module.exports = router;
