const mongoose = require('mongoose');

const agentSchema = new mongoose.Schema({
  name: String,
  isAvailable: { type: Boolean, default: true }
});

module.exports = mongoose.model('Agent', agentSchema);
