const orderService = require('../services/orderService');

const addOrder = async (req, res) => {
  try {
    const result = await orderService.createOrder(req.body);
    console.log("Order added successfully");
    res.status(200).json(result);
  } catch (error) {
    console.error('Error adding order:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  addOrder
};