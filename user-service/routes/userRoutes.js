const express = require('express');
const router = express.Router();
const {
  getOnlineRestaurants,
  placeOrder,
  rateOrder
} = require('../controllers/userController');

router.get('/restaurants/online', getOnlineRestaurants);
router.post('/orders', placeOrder);
router.post('/ratings', rateOrder);

module.exports = router;
