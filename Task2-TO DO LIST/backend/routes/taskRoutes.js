import express from 'express';
import * as taskController from '../controllers/taskController.js';

const router = express.Router();

router.post("/tasks", taskController.createTask);
router.get("/tasks", taskController.getAllTasks);
router.get("/tasks/:id", taskController.getTaskById);
router.put("/tasks/:id", taskController.updateTask);
router.delete("/tasks/:id", taskController.deleteTask);

export default router;