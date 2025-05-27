const { getDb } = require('../utils/database');
const courseService = require('./courseService');

const createOrder = async (orderData) => {
  const db = await getDb();
  const collection = db.collection("orders");
  
  // Insert the order
  const result = await collection.insertOne(orderData);
  
  // Update course spaces
  await updateOrderSpaces(orderData.items);
  
  return result;
};

const updateOrderSpaces = async (orderItems) => {
  // Validate input
  if (!Array.isArray(orderItems) || orderItems.length === 0) {
    throw new Error('Invalid order items: must be a non-empty array');
  }

  const updateResults = [];
  
  for (const item of orderItems) {
    try {
      const { name, quantity } = item;
      
      // Validate required properties
      if (!name || !quantity) {
        throw new Error(`Invalid item: missing name or quantity`);
      }

      const result = await courseService.updateCourseSpaces(name, quantity);
      updateResults.push({
        ...result,
        success: true
      });

    } catch (error) {
      console.error(`Error processing item:`, item, error.message);
      updateResults.push({
        course: item.name || 'Unknown',
        success: false,
        error: error.message
      });
    }
  }

  // Check if any updates failed
  const failed = updateResults.filter(r => !r.success);
  if (failed.length > 0) {
    throw new Error(`Some course updates failed: ${failed.map(f => f.error).join(', ')}`);
  }

  return updateResults;
};

module.exports = {
  createOrder
};