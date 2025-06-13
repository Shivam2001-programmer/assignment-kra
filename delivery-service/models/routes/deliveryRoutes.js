const express = require('express');
const router = express.Router();
const {
  assignDeliveryAgent,
  updateDeliveryStatus
} = require('../controllers/deliveryController');

router.post('/assign', assignDeliveryAgent);
router.put('/status/:id', updateDeliveryStatus);

module.exports = router;
