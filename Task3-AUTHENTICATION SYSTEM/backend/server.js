import express from "express";
import cors from "cors";
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';


const app = express();
const PORT = 5000;
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

app.get("/", (req, res) => {
  res.send("Auth API is running.");
});

app.listen(PORT, () =>{
   console.log(`Auth API running on http://localhost:${PORT}`);
});