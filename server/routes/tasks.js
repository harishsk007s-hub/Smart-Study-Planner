const express = require('express');
const router = express.Router();
const Task = require('../models/Task');

// GET /api/tasks - Get all tasks
// Returns all tasks from the database
router.get('/', async (req, res) => {
  try {
    // Fetch all tasks and sort by creation date (newest first)
    const tasks = await Task.find().sort({ createdAt: -1 });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /api/tasks - Create a new task
// Creates a new study task in the database
router.post('/', async (req, res) => {
  try {
    // Create new task from request body
    const task = new Task({
      title: req.body.title,
      description: req.body.description,
      deadline: req.body.deadline,
      status: req.body.status || 'pending'
    });

    // Save task to database
    const newTask = await task.save();
    res.status(201).json(newTask);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT /api/tasks/:id - Update a task
// Updates an existing task by ID
router.put('/:id', async (req, res) => {
  try {
    // Find and update task by ID
    const task = await Task.findByIdAndUpdate(
      req.params.id,
      {
        title: req.body.title,
        description: req.body.description,
        deadline: req.body.deadline,
        status: req.body.status
      },
      { new: true } // Return updated task
    );

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.json(task);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PATCH /api/tasks/:id/status - Toggle task status
// Updates only the status of a task (pending/completed)
router.patch('/:id/status', async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    // Toggle status between pending and completed
    task.status = task.status === 'pending' ? 'completed' : 'pending';
    await task.save();

    res.json(task);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE /api/tasks/:id - Delete a task
// Deletes a task by ID from the database
router.delete('/:id', async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.json({ message: 'Task deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Export the router
module.exports = router;
