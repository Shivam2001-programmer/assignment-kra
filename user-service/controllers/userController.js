const axios = require('axios');
const Order = require('../models/Order');

const RESTAURANT_SERVICE_URL = process.env.RESTAURANT_SERVICE_URL || 'http://localhost:3002';

exports.getOnlineRestaurants = async (req, res) => {
  try {
    const response = await axios.get(`${RESTAURANT_SERVICE_URL}/api/restaurants/online`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Unable to fetch restaurants' });
  }
};

exports.placeOrder = async (req, res) => {
  try {
    const { userId, restaurantId, items } = req.body;
    const order = await Order.create({ userId, restaurantId, items });
    res.status(201).json(order);
  } catch (err) {
    res.status(500).json({ error: 'Error placing order' });
  }
};

exports.rateOrder = async (req, res) => {
  try {
    const { orderId, rating } = req.body;
    const order = await Order.findByIdAndUpdate(orderId, { rating }, { new: true });
    res.json(order);
  } catch (err) {
    res.status(500).json({ error: 'Error rating order' });
  }
};
