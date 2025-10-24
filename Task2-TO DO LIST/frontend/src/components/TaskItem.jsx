export function TaskItem({ task, onUpdateStatus, onDelete }) {
  // Note: React automatically escapes HTML content, so
  // <strong>{task.title}</strong> is safe and doesn't need escapeHTML().

  return (
    <li className={`task-item ${task.completed ? "completed" : ""}`}>
      <input
        type="checkbox"
        checked={task.completed}
        onChange={(e) => onUpdateStatus(task.id, e.target.checked)}
      />
      <div className="task-content">
        <strong>{task.title}</strong>
        <p>{task.description}</p>
      </div>
      {/* CORRECT */}
      <button className="delete-btn" onClick={() => onDelete(task.id)}>
        Delete
      </button>
    </li>
  );
}
