import { useState, useEffect } from 'react';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import ProgressBar from './components/ProgressBar';
import { getTasks, createTask, updateTask, deleteTask, toggleTaskStatus } from './services/api';

/**
 * App Component - Main Application
 * Smart Study Planner Dashboard
 */
function App() {
  // State for tasks and UI
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load tasks from backend on component mount
  useEffect(() => {
    loadTasks();
  }, []);

  /**
   * Load all tasks from the API
   */
  const loadTasks = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getTasks();
      setTasks(data);
    } catch (err) {
      console.error('Error loading tasks:', err);
      setError('Failed to load tasks. Make sure the server is running!');
    } finally {
      setLoading(false);
    }
  };

  /**
   * Handle form submission (create or update task)
   */
  const handleSubmit = async (taskData) => {
    try {
      setError(null);
      
      if (editingTask) {
        // Update existing task
        const updatedTask = await updateTask(editingTask._id, taskData);
        setTasks(tasks.map(t => t._id === editingTask._id ? updatedTask : t));
        setEditingTask(null);
      } else {
        // Create new task
        const newTask = await createTask(taskData);
        setTasks([newTask, ...tasks]);
      }
    } catch (err) {
      console.error('Error saving task:', err);
      setError('Failed to save task. Please try again.');
    }
  };

  /**
   * Handle edit button click
   */
  const handleEdit = (task) => {
    setEditingTask(task);
    // Scroll to top of form
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  /**
   * Handle cancel edit
   */
  const handleCancelEdit = () => {
    setEditingTask(null);
  };

  /**
   * Handle delete task
   */
  const handleDelete = async (id) => {
    // Confirm before deleting
    if (!window.confirm('Are you sure you want to delete this task?')) {
      return;
    }

    try {
      setError(null);
      await deleteTask(id);
      setTasks(tasks.filter(t => t._id !== id));
      
      // Clear editing if deleted task was being edited
      if (editingTask && editingTask._id === id) {
        setEditingTask(null);
      }
    } catch (err) {
      console.error('Error deleting task:', err);
      setError('Failed to delete task. Please try again.');
    }
  };

  /**
   * Handle toggle task status
   */
  const handleToggleStatus = async (id) => {
    try {
      setError(null);
      const updatedTask = await toggleTaskStatus(id);
      setTasks(tasks.map(t => t._id === id ? updatedTask : t));
    } catch (err) {
      console.error('Error updating task status:', err);
      setError('Failed to update task status. Please try again.');
    }
  };

  return (
    <div className="app">
      {/* Header */}
      <header className="app-header">
        <h1>📚 Smart Study Planner</h1>
        <p>Organize your studies, track your progress!</p>
      </header>

      {/* Main Content */}
      <main className="app-main">
        {/* Error Message */}
        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        {/* Loading State */}
        {loading ? (
          <div className="loading">
            <p>Loading tasks...</p>
          </div>
        ) : (
          <div className="dashboard">
            {/* Left Column - Form and Progress */}
            <div className="left-column">
              {/* Task Form */}
              <TaskForm 
                onSubmit={handleSubmit} 
                editingTask={editingTask}
                onCancel={handleCancelEdit}
              />

              {/* Progress Bar */}
              <ProgressBar tasks={tasks} />
            </div>

            {/* Right Column - Task List */}
            <div className="right-column">
              <TaskList 
                tasks={tasks}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onToggleStatus={handleToggleStatus}
              />
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="app-footer">
        <p>Made with ❤️ for students</p>
      </footer>
    </div>
  );
}

export default App;
