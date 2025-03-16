import express from "express";
import upload from "../middleware/uploadMiddleware.js";
import authMiddleware from "../middleware/authMiddleware.js";
import {uploadFile, getAgentTasks } from "../controllers/task-controller.js";

const taskRouter = express.Router();

// Upload CSV & Distribute Tasks
taskRouter.post("/upload", authMiddleware, upload.single("file"), uploadFile );

taskRouter.get("/:agentId", authMiddleware, getAgentTasks)

export default taskRouter;
