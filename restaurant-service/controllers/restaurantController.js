const Restaurant = require('../models/Restaurant');
const Order = require('../models/Order');
const axios = require('axios');

const DELIVERY_SERVICE_URL = process.env.DELIVERY_SERVICE_URL || 'http://localhost:3003';

exports.getOnlineRestaurants = async (req, res) => {
  try {
    const onlineRestaurants = await Restaurant.find({ isOnline: true });
    res.json(onlineRestaurants);
  } catch (err) {
    res.status(500).json({ error: 'Unable to fetch online restaurants' });
  }
};

exports.updateRestaurant = async (req, res) => {
  try {
    const { id } = req.params;
    const update = req.body;
    const updatedRestaurant = await Restaurant.findByIdAndUpdate(id, update, { new: true });
    res.json(updatedRestaurant);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update restaurant' });
  }
};

exports.acceptOrder = async (req, res) => {
  try {
    const { restaurantId, items, userId } = req.body;
    const order = await Order.create({ restaurantId, items, userId, status: 'accepted' });
    const deliveryRes = await axios.post(`${DELIVERY_SERVICE_URL}/api/assign`, {
      orderId: order._id,
      restaurantId
    });

    order.deliveryAgentId = deliveryRes.data.agentId;
    await order.save();

    res.status(201).json(order);
  } catch (err) {
    res.status(500).json({ error: 'Failed to accept order or assign delivery' });
  }
};
