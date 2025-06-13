const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const deliveryRoutes = require('./routes/deliveryRoutes');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api', deliveryRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Delivery Service DB connected');
    app.listen(3003, () => console.log('Delivery Service running on port 3003'));
  })
  .catch(err => console.error(err));
