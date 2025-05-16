// backend/index.js
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Mount your /chat route
const styloRoutes = require('./Stylo/Stylo'); // adjust path if needed
app.use('/', styloRoutes);

app.listen(5033, () => {
  console.log('🧵 Stylo backend running on http://localhost:5033');
});
