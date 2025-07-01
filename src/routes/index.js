const express = require('express');
const lessonRoutes = require('./lessons');
const orderRoutes = require('./orders');
const { getDb } = require('../utils/database');
const lessonService = require('../services/lessonService');

const router = express.Router();

router.use('/lessons', lessonRoutes);
router.use('/orders', orderRoutes);

// Search lesson Route
router.get('/search', async (req, res) => {
    try {
        const query = req.query.q || '';
        const results = await lessonService.searchLessons(query);
        res.json(results);
    } catch (error) {
        console.error("Search route error:", error);
        res.status(500).json({ message: "Failed to search lessons" });
    }
});

module.exports = router;
