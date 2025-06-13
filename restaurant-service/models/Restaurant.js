const mongoose = require('mongoose');

const restaurantSchema = new mongoose.Schema({
  name: String,
  isOnline: Boolean,
  menu: [String]
});

module.exports = mongoose.model('Restaurant', restaurantSchema);
