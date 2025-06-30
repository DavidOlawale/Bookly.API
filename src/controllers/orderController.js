const orderService = require('../services/orderService');

// Create order endpoint
exports.createOrder = async (req, res) => {
    try {
        const result = await orderService.createOrder(req.body);

        res.status(201).json({
            message: 'Order created successfully!',
            orderId: result.insertedId
        });

    } catch (error) {
        console.error("Error in orderController.createOrder:", error);
        if (error.message.includes('Missing required')) {
            return res.status(400).json({ message: error.message });
        }
        res.status(500).json({ message: 'Failed to create order.' });
    }
};
