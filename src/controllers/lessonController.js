const lessonService = require('../services/lessonService');

// Get all lessons endpoint
exports.getAllLessons = async (req, res) => {
    try {
        const lessons = await lessonService.getAllLessons();
        res.status(200).json(lessons);
    } catch (error) {
        console.error("Error in lessonController.getAllLessons:", error);
        res.status(500).json({ message: 'Failed to retrieve lessons.' });
    }
};

// Update a lesson endpoint
exports.updateLesson = async (req, res) => {
    try {
        const { id } = req.params;
        const { availableSpaces } = req.body;

        const result = await lessonService.updateLesson(id, availableSpaces);

        if (result.matchedCount === 0) {
            return res.status(404).json({ message: 'Lesson not found.' });
        }

        res.status(200).json({ message: 'Lesson updated successfully.' });

    } catch (error) {
        console.error("Error in lessonController.updateLesson:", error);
        // If the service threw a validation error, it might be a user error
        if (error.message.includes('Invalid')) {
            return res.status(400).json({ message: error.message });
        }
        res.status(500).json({ message: 'Failed to update lesson.' });
    }
};