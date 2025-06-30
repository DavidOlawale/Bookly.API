const { getDb } = require('../utils/database');
const { ObjectId } = require('mongodb');

// Finds all lessons in the database
exports.findAll = async () => {
    const db = getDb();
    return await db.collection('lessons').find({}).toArray();
};

// Updates the available spaces for a specific lesson by its ID
exports.updateSpaces = async (id, availableSpaces) => {
    const db = getDb();
    return await db.collection('lessons').updateOne(
        { _id: new ObjectId(id) }, // Correctly use ObjectId
        { $set: { availableSpaces: availableSpaces } }
    );
};

// Searches for lessons based on a query string (case-insensitive)
exports.search = async (query) => {
    const db = getDb();
    return await db.collection('lessons').find({
        $or: [
            { name: { $regex: query, $options: 'i' } },
            { location: { $regex: query, $options: 'i' } }
        ]
    }).toArray();
};