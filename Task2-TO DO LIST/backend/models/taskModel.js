import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';    

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_FILE = path.join(__dirname, '../database.json');


function readTasks(){
    if(!fs.existsSync(DATA_FILE)){
        return [];
    }

    try {
        const data = fs.readFileSync(DATA_FILE, 'utf-8');
        return data ? JSON.parse(data) : [];
    } catch (error) {
        console.error('Error reading tasks:', error);
        return [];
    }
};

function writeTasks(tasks){
    fs.writeFileSync(DATA_FILE, JSON.stringify(tasks, null, 2));
};


export const findAll = (completed) =>{
    let tasks = readTasks();
    if(completed !== undefined){
        let isCompleted = completed === 'true';
        tasks = tasks.filter(task => task.completed === isCompleted);
    }

    return tasks;
};

export const findById = (id) =>{
    const tasks = readTasks();
    return tasks.find(task => task.id === id);
};

export const create = (task) =>{
    const tasks = readTasks();
    const newTask = {
        id : Date.now().toString(),
        title : task.title,
        completed : false,
        description : task.description || "",
    };
    tasks.push(newTask);
    writeTasks(tasks);
    return newTask;
};

export const update = (id, updateData) => {
  const tasks = readTasks();
  const index = tasks.findIndex((t) => t.id === id);
  if (index === -1) {
    const error = new Error("Task not found");
    error.status = 404; // Set status to 404
    throw error;
  }

  const task = tasks[index];
  if (typeof updateData.title !== 'undefined') {
    task.title = updateData.title;
  }
  if (typeof updateData.description !== 'undefined') {
    task.description = updateData.description;
  }
  if (typeof updateData.completed !== 'undefined') {
    task.completed = updateData.completed;
  }

  tasks[index] = task;
  writeTasks(tasks); 
};

export const remove = (id) =>{
    let tasks = readTasks();
    const intialLength = tasks.length;
    tasks = tasks.filter(task => task.id !== id);
    if(intialLength === tasks.length){
        const error = new Error("Task not found");
        error.status = 404;
        throw error;
    }
    writeTasks(tasks);
    return true;
};