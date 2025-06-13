const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  restaurantId: String,
  items: [String],
  status: { type: String, default: 'placed' },
  deliveryAgentId: String,
  rating: Number
});

module.exports = mongoose.model('Order', orderSchema);
