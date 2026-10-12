
function formatStatus(status = '') {
  return status.replaceAll('_', ' ');
}

function formatPriority(priority = '') {
  return priority.toLowerCase();
}

export default function TaskTable({
  tasks,
  loading,
  error,
  sortBy,
  sortOrder,
  onSort,
}) {
  if (loading) {
    return (
      <div className="table-state">
        <div className="spinner" />
        <p>Loading your tasks...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="table-state error-state" role="alert">
        <div className="empty-icon">!</div>
        <h3>Couldn't load tasks</h3>
        <p>{error}</p>
        <p>Check that the backend is running on port 8080.</p>
      </div>
    );
  }

  if (!tasks?.length) {
    return (
      <div className="table-state">
        <div className="empty-icon">⌕</div>
        <h3>No tasks found</h3>
        <p>Try another keyword or change your status filter.</p>
      </div>
    );
  }

  function heading(label, key) {
    const active = sortBy === key;

    return (
      <th aria-sort={
        active
          ? sortOrder === 'asc'
            ? 'ascending'
            : 'descending'
          : 'none'
      }>
        <button
          type="button"
          className={`table-sort ${active ? 'active-sort' : ''}`}
          onClick={() => onSort(key)}
        >
          {label}
          <span>{active ? (sortOrder === 'asc' ? ' ↑' : ' ↓') : ' ↕'}</span>
        </button>
      </th>
    );
  }

  return (
    <div className="table-wrapper">
      <table className="task-table">
        <thead>
          <tr>
            {heading('Task ID', 'id')}
            {heading('Task', 'title')}
            {heading('Status', 'status')}
            {heading('Priority', 'priority')}
            {heading('Assignee', 'assignee')}
          </tr>
        </thead>

        <tbody>
          {tasks.map((task) => (
            <tr key={task.id}>
              <td>
                <span className="task-id">#{task.id}</span>
              </td>

              <td className="task-details">
                <strong>{task.title}</strong>
                <p>{task.description || 'No description provided'}</p>
              </td>

              <td>
                <span
                  className={`status-badge ${String(task.status)
                    .toLowerCase()}`}
                >
                  <span className="badge-dot" />
                  {formatStatus(task.status)}
                </span>
              </td>

              <td>
                <span
                  className={`priority-badge ${formatPriority(task.priority)}`}
                >
                  {task.priority || '—'}
                </span>
              </td>

              <td className="assignee-cell">
                <span className="avatar">
                  {(task.assignee || '?').trim().charAt(0).toUpperCase()}
                </span>
                {task.assignee || 'Unassigned'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
