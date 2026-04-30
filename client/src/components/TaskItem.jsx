/**
 * TaskItem Component
 * Displays a single study task with actions (edit, delete, toggle status)
 */
function TaskItem({ task, onEdit, onDelete, onToggleStatus }) {
  // Format deadline date for display
  const formatDeadline = (dateString) => {
    if (!dateString) return 'No deadline';
    
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Check if task is overdue
  const isOverdue = () => {
    if (!task.deadline || task.status === 'completed') return false;
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const deadline = new Date(task.deadline);
    return deadline < today;
  };

  return (
    <div className={`task-item ${task.status} ${isOverdue() ? 'overdue' : ''}`}>
      {/* Task Header */}
      <div className="task-header">
        <h4 className="task-title">{task.title}</h4>
        <span className={`task-status status-${task.status}`}>
          {task.status}
        </span>
      </div>

      {/* Task Description */}
      {task.description && (
        <p className="task-description">{task.description}</p>
      )}

      {/* Task Footer with deadline and actions */}
      <div className="task-footer">
        <span className={`task-deadline ${isOverdue() ? 'overdue' : ''}`}>
          📅 {formatDeadline(task.deadline)}
        </span>

        {/* Action Buttons */}
        <div className="task-actions">
          {/* Toggle Status Button */}
          <button
            className={`btn btn-toggle ${task.status === 'completed' ? 'btn-pending' : 'btn-complete'}`}
            onClick={() => onToggleStatus(task._id)}
            title={task.status === 'completed' ? 'Mark as pending' : 'Mark as completed'}
          >
            {task.status === 'completed' ? '↩️ Undo' : '✅ Complete'}
          </button>

          {/* Edit Button */}
          <button
            className="btn btn-edit"
            onClick={() => onEdit(task)}
            title="Edit task"
          >
            ✏️ Edit
          </button>

          {/* Delete Button */}
          <button
            className="btn btn-delete"
            onClick={() => onDelete(task._id)}
            title="Delete task"
          >
            🗑️ Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default TaskItem;
