import * as Task from '../models/taskModel.js'

export const getAllTasks = (req, res) =>{
    try {
        const {completed} = req.query;
        const tasks = Task.findAll(completed);
        res.json(tasks);
    } catch (error) {
        res.status(error.status || 500).json({error: error.message});
    }
};

export const getTaskById = (req, res) => {
  try {
    const task = Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }
    res.json(task);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve task" });
  }
};

export const createTask = (req, res) => {
  try {
    const { title, description } = req.body;
    if (!title) {
      return res.status(400).json({ error: "title is required" });
    }
    const newTask = Task.create({ title, description });
    res.status(201).json({ message: "Task added", task: newTask });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateTask = (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, completed } = req.body;
    
    const updatedTask = Task.update(id, { title, description, completed });
    res.json({ message: "Task updated", task: updatedTask });
  } catch (error) {
    res.status(error.status || 500).json({ error: error.message });
  }
};

export const deleteTask = (req, res) => {
  try {
    const { id } = req.params;
    Task.remove(id);
    res.json({ message: "Task deleted" });
  } catch (error) {
    res.status(error.status || 500).json({ error: error.message });
  }
};