export function UserItem({ user, onEdit, onDelete }) {
  return (
    <li className="user-item">
      <div className="user-item-info">
        <strong>{user.name}</strong>
        <span>{user.email}</span>
      </div>
      <div className="user-item-info">
        <strong>Age</strong>
        <span>{user.age}</span>
      </div>
      <div className="user-item-actions">
        <button onClick={() => onEdit(user)}>
          Edit
        </button>
        <button className="delete-btn" onClick={() => onDelete(user.id)}>
          Delete
        </button>
      </div>
    </li>
  );
}