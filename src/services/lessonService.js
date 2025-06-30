const lessonDal = require('../dal/lessonDal');

// Service to get all lessons
exports.getAllLessons = async () => {
    // In a more complex app, you might add caching or other logic here.
    return await lessonDal.findAll();
};

// Service to update a lesson's spaces
exports.updateLesson = async (id, availableSpaces) => {
    if (typeof availableSpaces !== 'number') {
        // Business logic validation
        throw new Error('Invalid availableSpaces value.');
    }
    return await lessonDal.updateSpaces(id, availableSpaces);
};

// Service to search for lessons
exports.searchLessons = async (query) => {
    if (!query) {
        return await lessonDal.findAll();
    }
    return await lessonDal.search(query);
};