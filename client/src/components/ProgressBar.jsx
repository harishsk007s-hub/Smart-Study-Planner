/**
 * ProgressBar Component
 * Displays progress tracking (completed vs pending tasks)
 */
function ProgressBar({ tasks }) {
  // Calculate total, completed, and pending counts
  const total = tasks.length;
  const completed = tasks.filter(task => task.status === 'completed').length;
  const pending = total - completed;
  
  // Calculate percentage of completed tasks
  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

  return (
    <div className="progress-section">
      <h3>📊 Progress</h3>
      
      {/* Statistics Cards */}
      <div className="stats-cards">
        <div className="stat-card total">
          <span className="stat-number">{total}</span>
          <span className="stat-label">Total Tasks</span>
        </div>
        <div className="stat-card completed">
          <span className="stat-number">{completed}</span>
          <span className="stat-label">Completed</span>
        </div>
        <div className="stat-card pending">
          <span className="stat-number">{pending}</span>
          <span className="stat-label">Pending</span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="progress-bar-container">
        <div className="progress-bar">
          <div 
            className="progress-fill" 
            style={{ width: `${percentage}%` }}
          />
        </div>
        <span className="progress-percentage">{percentage}% Complete</span>
      </div>
    </div>
  );
}

export default ProgressBar;
