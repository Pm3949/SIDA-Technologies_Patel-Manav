import express from "express";
import cors from "cors";
import userRoutes from './routes/userRoutes.js';

const app = express();

app.use(cors());
app.use(express.json());

const PORT = 5000;

app.use("/api", userRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});