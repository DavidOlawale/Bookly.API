const { MongoClient } = require('mongodb');

const uri = process.env.MONGO_URI;
const dbName = process.env.DB_NAME;
const client = new MongoClient(uri);

let db;

const connectToDb = async () => {
    if (db) return db; // If already connected, return the existing connection
    try {
        await client.connect();
        console.log("Successfully connected to MongoDB Atlas!");
        db = client.db(dbName);
    } catch (error) {
        console.error("Could not connect to DB", error);
        throw error;
    }
};

const getDb = () => {
    if (!db) {
        throw new Error("Database not initialized. Call connectToDb first.");
    }
    return db;
};

module.exports = { connectToDb, getDb };
