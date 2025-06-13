const express = require('express');
const router = express.Router();
const {
  getOnlineRestaurants,
  updateRestaurant,
  acceptOrder
} = require('../controllers/restaurantController');

router.get('/online', getOnlineRestaurants);
router.put('/:id', updateRestaurant);
router.post('/order', acceptOrder);

module.exports = router;
