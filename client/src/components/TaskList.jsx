import TaskItem from './TaskItem';

/**
 * TaskList Component
 * Displays a list of all study tasks
 */
function TaskList({ tasks, onEdit, onDelete, onToggleStatus }) {
  return (
    <div className="task-list">
      <h3>Your Study Tasks</h3>
      
      {tasks.length === 0 ? (
        // Empty state message
        <div className="empty-state">
          <p>📚 No tasks yet!</p>
          <p>Add your first study task above to get started.</p>
        </div>
      ) : (
        // Task list
        <div className="tasks-container">
          {tasks.map((task) => (
            <TaskItem
              key={task._id}
              task={task}
              onEdit={onEdit}
              onDelete={onDelete}
              onToggleStatus={onToggleStatus}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default TaskList;
