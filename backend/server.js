const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const db = require('./db');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/api', authRoutes);

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

const profileRoutes = require('./routes/profileroutes');
const slotRoutes = require('./routes/slotroute'); 
const searchRoutes = require('./routes/searchroutes'); // Adjust path as needed
app.use('/api/search', searchRoutes);


app.use('/api/profile', profileRoutes); 
app.use('/api/slot', slotRoutes);
