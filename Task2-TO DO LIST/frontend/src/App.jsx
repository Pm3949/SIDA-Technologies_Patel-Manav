import { useState, useEffect } from "react";
import { AddTaskForm } from "./components/AddTaskForm";
import { TaskList } from "./components/TaskList";
import { FilterControls } from "./components/FilterControls";
import "./App.css"; // Or './index.css', wherever you put the CSS

const API_BASE_URL = "http://localhost:5000/api/tasks";

function App() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all"); // 'all', 'completed', 'incomplete'
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch tasks when component mounts or filter changes
  useEffect(() => {
    async function fetchTasks() {
      let url = API_BASE_URL;
      if (filter === "completed") {
        url += "?completed=true";
      } else if (filter === "incomplete") {
        url += "?completed=false";
      }

      setLoading(true);
      setError(null);

      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Failed to fetch tasks");
        }
        const data = await response.json();
        setTasks(data);
      } catch (error) {
        setError(error.message);
        console.error("Failed to fetch tasks:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchTasks();
  }, [filter]); // Re-run this effect when 'filter' changes

  // --- API Handlers ---

// src/App.jsx

  const handleAddTask = async (title, description) => {
    try {
      const response = await fetch(API_BASE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, description }),
      });

      // --- ADD THIS CHECK ---
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create task');
      }

      const newTask = await response.json();
      
      // Now this only runs on success
      setTasks(prevTasks => [...prevTasks, newTask.task]);
      
    } catch (error) {
      console.error('Failed to create task:', error);
      // Show an alert so you know it failed!
      alert(`Error: ${error.message}`);
    }
  };

  const handleUpdateTaskStatus = async (id, completed) => {
    try {
      await fetch(`${API_BASE_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ completed }),
      });

      // Update the task in the local state
      setTasks((prevTasks) =>
        prevTasks
          .map((task) => (task.id === id ? { ...task, completed } : task))
          .filter((task) => {
            // After updating, filter it out if it no longer matches
            if (filter === "completed" && !completed) return false;
            if (filter === "incomplete" && completed) return false;
            return true;
          })
      );
    } catch (error) {
      console.error("Failed to update task:", error);
    }
  };

  // src/App.jsx

  const handleDeleteTask = async (id) => {
    // 1. Use window.confirm for the ESLint fix
    if (!window.confirm("Are you sure you want to delete this task?")) return;

    try {
      const response = await fetch(`${API_BASE_URL}/${id}`, {
        method: "DELETE",
      });

      // 2. CHECK if the response was successful
      if (!response.ok) {
        // If not, throw an error to be caught below
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to delete task");
      }

      // 3. ONLY update state if the API call was successful
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
    } catch (error) {
      console.error("Delete task error:", error);
      // 4. Show the error to the user!
      alert(`Error: ${error.message}`);
    }
  };

  return (
    <div className="container">
      <h1>My To-Do List</h1>
      <AddTaskForm onAddTask={handleAddTask} />
      <FilterControls currentFilter={filter} onFilterChange={setFilter} />

      {loading && <p>Loading tasks...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {!loading && !error && (
        <TaskList
          tasks={tasks}
          onUpdateStatus={handleUpdateTaskStatus}
          onDelete={handleDeleteTask}
        />
      )}
    </div>
  );
}

export default App;
