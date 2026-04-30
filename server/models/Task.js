const mongoose = require('mongoose');

// Task Schema Definition
// Defines the structure for study tasks in MongoDB
const taskSchema = new mongoose.Schema({
  // Task title - required field
  title: {
    type: String,
    required: true,
    trim: true
  },
  // Task description - optional detailed info
  description: {
    type: String,
    trim: true,
    default: ''
  },
  // Task deadline - date when task should be completed
  deadline: {
    type: String,
    default: ''
  },
  // Task status - either pending or completed
  status: {
    type: String,
    enum: ['pending', 'completed'],
    default: 'pending'
  },
  // Timestamp for when task was created
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Export the Task model
module.exports = mongoose.model('Task', taskSchema);
