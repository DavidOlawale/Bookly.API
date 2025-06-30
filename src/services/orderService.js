const orderDal = require('../dal/orderDal');

// Service to create an order
exports.createOrder = async (orderData) => {
    const { name, phone, lessonIds, spaces } = orderData;

    if (!name || !phone || !lessonIds || !spaces) {
        throw new Error('Missing required order information.');
    }

    const newOrder = {
        name,
        phone,
        lessonIds,
        spaces,
        createdAt: new Date()
    };

    return await orderDal.create(newOrder);
};