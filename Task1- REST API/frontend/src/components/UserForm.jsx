import { useState, useEffect } from 'react';

export function UserForm({ currentUser, onCreate, onUpdate, onCancel }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');
  
  const isEditing = !!currentUser;

  // Effect to fill the form when a user is selected for editing
  useEffect(() => {
    if (isEditing) {
      setName(currentUser.name);
      setEmail(currentUser.email);
      setAge(currentUser.age);
    } else {
      // Clear form when not editing
      setName('');
      setEmail('');
      setAge('');
    }
  }, [currentUser, isEditing]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const userData = { name, email, age: Number(age) };
    
    if (isEditing) {
      onUpdate(currentUser.id, userData);
    } else {
      onCreate(userData);
    }
    
    // Clear form after submission
    if (!isEditing) {
      setName('');
      setEmail('');
      setAge('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="age">Age</label>
        <input
          type="number"
          id="age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          required
        />
      </div>
      <div className="form-actions">
        <button type="submit">
          {isEditing ? 'Update User' : 'Create User'}
        </button>
        {isEditing && (
          <button type="button" className="secondary-btn" onClick={onCancel}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}