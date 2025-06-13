const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  orderId: String,
  agentId: String,
  status: { type: String, default: 'assigned' }
});

module.exports = mongoose.model('DeliveryOrder', orderSchema);
