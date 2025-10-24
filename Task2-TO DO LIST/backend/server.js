import express from 'express';
import taskRoutes from './routes/taskRoutes.js';
import cors from 'cors';

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.use("/api",taskRoutes);

app.get("/", (req, res) => {
  res.send("To-Do API is running. Try /api/tasks");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});