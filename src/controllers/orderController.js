const { getDb } = require('../utils/database');

exports.createOrder = async (req, res) => {
    try {
        const db = getDb();
        const { name, phone, lessonIds, spaces } = req.body;

        if (!name || !phone || !lessonIds || !spaces) {
            return res.status(400).json({ message: 'Missing required order information.' });
        }

        const newOrder = {
            name,
            phone,
            lessonIds, // Array of lesson IDs
            spaces,    // Object mapping lessonId to quantity
            createdAt: new Date()
        };

        const result = await db.collection('orders').insertOne(newOrder);

        res.status(201).json({ 
            message: 'Order created successfully!',
            orderId: result.insertedId 
        });

    } catch (error) {
        console.error("Error creating order:", error);
        res.status(500).json({ message: 'Failed to create order.' });
    }
};
