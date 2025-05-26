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

const updateCourseSpaces = async (courseName, quantity) => {
  const db = getDb();
  const collection = db.collection("courses");
  
  // Find course by name
  const courseData = await collection.findOne({ name: courseName });
  
  if (!courseData) {
    throw new Error(`Course not found: ${courseName}`);
  }

  // Check if enough spaces are available
  if (courseData.availableSpaces < quantity) {
    throw new Error(`Insufficient spaces. Available: ${courseData.availableSpaces}, Requested: ${quantity}`);
  }

  // Update available spaces
  const result = await collection.updateOne(
    { name: courseName }, 
    { $inc: { availableSpaces: -quantity } }
  );

  if (result.modifiedCount === 0) {
    throw new Error('Update operation failed');
  }

  return {
    course: courseName,
    spacesReduced: quantity,
    newAvailableSpaces: courseData.availableSpaces - quantity
  };
};

module.exports = {
  getAllCourses,
  searchCourses,
  updateCourseSpaces
};