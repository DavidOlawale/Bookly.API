const express = require('express');
const lessonRoutes = require('./lessons');
const orderRoutes = require('./orders');
const { getDb } = require('../utils/database');

const router = express.Router();

router.use('/lessons', lessonRoutes);
router.use('/orders', orderRoutes);

// Search lesson Route
router.get('/search', async (req, res) => {
    try {
        const db = getDb();
        const query = req.query.q || '';

        const results = await db.collection('lessons').find({
            $or: [
                { name: { $regex: query, $options: 'i' } },
                { location: { $regex: query, $options: 'i' } }
            ]
        }).toArray();

        res.json(results);
    } catch (error) {
        console.error("Search error:", error);
        res.status(500).json({ message: "Failed to search lessons" });
    }
});

module.exports = router;
