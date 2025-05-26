
const courseService = require('../services/courseService');

const getCourses = async (req, res) => {
  try {
    const courses = await courseService.getAllCourses();
    res.status(200).json(courses);
  } catch (error) {
    console.error('Error fetching courses:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const searchCourses = async (req, res) => {
  try {
    const query = req.query.query || '';
    const courses = await courseService.searchCourses(query);
    res.status(200).json(courses);
  } catch (error) {
    console.error('Error searching courses:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  getCourses,
  searchCourses
};