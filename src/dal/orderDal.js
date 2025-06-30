const { getDb } = require('../utils/database');

// Inserts a new order document into the database
exports.create = async (orderData) => {
    const db = getDb();
    return await db.collection('orders').insertOne(orderData);
};