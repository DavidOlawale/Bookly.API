const { MongoClient } = require('mongodb');

let client;
let db;

const connectDB = async () => {
  try {
    let a = process.env.MONGODB_URI;
    debugger;
    client = new MongoClient(process.env.MONGODB_URI || 'mongodb://localhost:27017');
    await client.connect();
    db = client.db('BooklyDB');
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error);
    process.exit(1);
  }
};

const getDb = async () => {
  if (!db) {
    await connectDB();
  }
  return db;
};

const closeDB = async () => {
  if (client) {
    await client.close();
    console.log('MongoDB connection closed');
  }
};

module.exports = {
  connectDB,
  getDb,
  closeDB
};