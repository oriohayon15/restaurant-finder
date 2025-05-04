const express = require('express');
const cors = require('cors');
const usersRoute = require('./routes/users');
const restaurantsRoute = require('./routes/restaurants');
const favoritesRoutes = require('./routes/favorites');
require('dotenv').config({ path: '../.env' });
const port = 5001;

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/users', usersRoute); 
app.use('/api/restaurants', restaurantsRoute);
app.use('/api/favorites', favoritesRoutes);

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });