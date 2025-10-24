import { useState, useEffect } from 'react';
import { UserList } from './components/UserList';
import { UserForm } from './components/UserForm';

// API URL from your backend setup
const API_BASE_URL = 'http://localhost:5000/api/users'; //

function App() {
  const [users, setUsers] = useState([]);
  const [currentUserToEdit, setCurrentUserToEdit] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch all users on initial load
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(API_BASE_URL);
      if (!response.ok) throw new Error('Failed to fetch users');
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // --- API Handlers ---

  const handleCreateUser = async (userData) => {
    try {
      const response = await fetch(API_BASE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to create user');
      }
      // Refresh list to get the new user
      fetchUsers();
    } catch (error) {
      setError(error.message);
    }
  };

  const handleUpdateUser = async (id, userData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to update user');
      }
      // Refresh list to show updated user
      fetchUsers();
    } catch (error) {
      setError(error.message);
    }
  };

  const handleDeleteUser = async (id) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return;
    
    try {
      const response = await fetch(`${API_BASE_URL}/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to delete user');
      }
      // Refresh list
      fetchUsers();
    } catch (error) {
      setError(error.message);
    }
  };

  // --- Form State Handlers ---

  const handleEditClick = (user) => {
    setCurrentUserToEdit(user);
  };

  const handleCancelEdit = () => {
    setCurrentUserToEdit(null);
  };

  return (
    <div className="container">
      <h1>User Management</h1>
      <UserForm
        currentUser={currentUserToEdit}
        onCreate={handleCreateUser}
        onUpdate={handleUpdateUser}
        onCancel={handleCancelEdit}
      />
      <h2>User List</h2>
      {loading && <p>Loading users...</p>}
      {error && <p className="error-message">{error}</p>}
      {!loading && !error && (
        <UserList
          users={users}
          onEdit={handleEditClick}
          onDelete={handleDeleteUser}
        />
      )}
    </div>
  );
}

export default App;