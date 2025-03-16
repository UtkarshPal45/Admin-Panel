import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/connectDB.js";
import authRouter from "./routes/admin-auth-route.js";
import agentRouter from "./routes/agent-route.js";
import taskRouter from "./routes/task-route.js";


dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(cors({ origin: "*", methods: ["GET", "POST", "PUT", "DELETE"] }));

app.use("/api/admin", authRouter);
app.use("/api/agents", agentRouter);
app.use("/api/tasks", taskRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
