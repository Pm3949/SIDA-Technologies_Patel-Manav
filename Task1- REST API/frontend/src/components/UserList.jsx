import { UserItem } from './UserItem';

export function UserList({ users, onEdit, onDelete }) {
  if (users.length === 0) {
    return <p>No users found. Add one above!</p>;
  }

  return (
    <ul className="user-list">
      {users.map(user => (
        <UserItem
          key={user.id}
          user={user}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
}