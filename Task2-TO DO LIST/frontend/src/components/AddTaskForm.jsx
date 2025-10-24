import { useState } from 'react';

export function AddTaskForm({ onAddTask }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title) return; // Title is required
    
    onAddTask(title, description);
    
    // Clear form
    setTitle('');
    setDescription('');
  };

  return (
    <form id="add-task-form" onSubmit={handleSubmit}>
      <input
        type="text"
        id="title"
        placeholder="Task Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        id="description"
        placeholder="Task Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      ></textarea>
      <button type="submit">Add Task</button>
    </form>
  );
}