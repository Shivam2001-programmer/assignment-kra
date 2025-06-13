const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  restaurantId: String,
  items: [String],
  userId: String,
  status: { type: String, default: 'pending' },
  deliveryAgentId: String
});

module.exports = mongoose.model('RestaurantOrder', orderSchema);
