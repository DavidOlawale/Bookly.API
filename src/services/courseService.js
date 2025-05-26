const { getDb } = require('../utils/database');

const getAllCourses = async () => {
  const db = getDb();
  const collection = db.collection("courses");
  return await collection.find({}).toArray();
};

const searchCourses = async (query) => {
  const db = getDb();
  const collection = db.collection("courses");
  return await collection.find({
    name: { $regex: query, $options: 'i' }
  }).toArray();
};

module.exports = {
  getAllCourses,
  searchCourses
};