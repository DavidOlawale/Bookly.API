const { getDb } = require('../utils/database');
const { ObjectId } = require('mongodb');

exports.getAllLessons = async (req, res) => {
    try {
        const db = getDb();
        const lessons = await db.collection('lessons').find({}).toArray();
        res.status(200).json(lessons);
    } catch (error) {
        console.error("Error fetching lessons:", error);
        res.status(500).json({ message: 'Failed to retrieve lessons.' });
    }
};

exports.updateLesson = async (req, res) => {
    try {
        const db = getDb();
        const { id } = req.params;
        const { availableSpaces } = req.body;

        if (typeof availableSpaces !== 'number') {
            return res.status(400).json({ message: 'Invalid availableSpaces value.' });
        }

        const result = await db.collection('lessons').updateOne(
            { _id: new ObjectId(id) },
            { $set: { availableSpaces: availableSpaces } }
        );

        if (result.matchedCount === 0) {
            return res.status(404).json({ message: 'Lesson not found.' });
        }

        res.status(200).json({ message: 'Lesson updated successfully.' });

    } catch (error) {
        console.error("Error updating lesson:", error);
        res.status(500).json({ message: 'Failed to update lesson.' });
    }
};
