import { useState, useEffect } from 'react';

/**
 * TaskForm Component
 * Form for creating and editing study tasks
 */
function TaskForm({ onSubmit, editingTask, onCancel }) {
  // Form state
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [deadline, setDeadline] = useState('');

  // Populate form when editing an existing task
  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title || '');
      setDescription(editingTask.description || '');
      setDeadline(editingTask.deadline || '');
    } else {
      // Reset form when adding new task
      setTitle('');
      setDescription('');
      setDeadline('');
    }
  }, [editingTask]);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate title is required
    if (!title.trim()) {
      alert('Please enter a task title');
      return;
    }

    // Submit task data
    onSubmit({
      title: title.trim(),
      description: description.trim(),
      deadline: deadline,
      status: editingTask?.status || 'pending'
    });

    // Reset form after submission (only if not editing)
    if (!editingTask) {
      setTitle('');
      setDescription('');
      setDeadline('');
    }
  };

  return (
    <div className="task-form">
      <h3>{editingTask ? 'Edit Task' : 'Add New Task'}</h3>
      <form onSubmit={handleSubmit}>
        {/* Title Input */}
        <div className="form-group">
          <label htmlFor="title">Title *</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter task title"
            maxLength={100}
          />
        </div>

        {/* Description Input */}
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter task description (optional)"
            rows={3}
          />
        </div>

        {/* Deadline Input */}
        <div className="form-group">
          <label htmlFor="deadline">Deadline</label>
          <input
            type="date"
            id="deadline"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
          />
        </div>

        {/* Form Buttons */}
        <div className="form-buttons">
          <button type="submit" className="btn btn-primary">
            {editingTask ? 'Update Task' : 'Add Task'}
          </button>
          
          {editingTask && (
            <button 
              type="button" 
              className="btn btn-secondary"
              onClick={onCancel}
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default TaskForm;
