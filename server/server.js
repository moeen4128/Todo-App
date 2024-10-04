// server.js
const express = require('express');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const todoRoutes = require('./routes/todos');

const app = express();
app.use(express.json());  // Middleware to parse JSON bodies

// Connect to the database
connectDB();

// Define routes
app.use('/api/auth', authRoutes);
app.use('/api', todoRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
