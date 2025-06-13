const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const restaurantRoutes = require('./routes/restaurantRoutes');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/restaurants', restaurantRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Restaurant Service DB connected');
    app.listen(3002, () => console.log('Restaurant Service running on port 3002'));
  })
  .catch(err => console.error(err));
