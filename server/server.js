const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const taskRoutes = require('./routes/tasks');

// Initialize Express app
const app = express();
const PORT = 5000;

// MongoDB connection string (local MongoDB)
const MONGO_URI = 'mongodb://localhost:27017/studyplanner';

// Middleware
app.use(cors()); // Enable CORS for frontend
app.use(express.json()); // Parse JSON request bodies

// API Routes
// Mount task routes at /api/tasks endpoint
app.use('/api/tasks', taskRoutes);

// Root route - API health check
app.get('/', (req, res) => {
  res.json({ message: 'Smart Study Planner API is running!' });
});

// Connect to MongoDB and start server
mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB successfully');
    
    // Start the Express server
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error('Unhandled Rejection:', err);
});
