import csvParser from "csv-parser";
import Task from "../models/Task.js";
import Agent from "../models/Agent.js";

const uploadFile = async (req, res) => {

    if (!req.file) return res.status(400).json({ message: "No file uploaded" });
  
    const results = [];
    
    // Parse CSV Data
    try {
      const bufferString = req.file.buffer.toString();
      bufferString.split("\n").forEach((line, index) => {
        if (index === 0) return; // Skip Header Row
        const [firstName, phone, notes] = line.split(",");
        if (firstName && phone) results.push({ firstName, phone, notes });
      });
  
      if (results.length === 0) return res.status(400).json({ message: "Invalid or empty CSV" });
  
      // Get Agents
      const agents = await Agent.find();
      if (agents.length < 5) return res.status(400).json({ message: "At least 5 agents required" });
  
      // Distribute Tasks Equally
      const assignedTasks = [];
      for (let i = 0; i < results.length; i++) {
        const agent = agents[i % agents.length];
        assignedTasks.push({ ...results[i], agent: agent._id });
      }
  
      // Save to Database
      await Task.insertMany(assignedTasks);
  
      res.status(201).json({ message: "Tasks distributed successfully" });
  
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
}

const getAgentTasks = async (req, res) => {
    try {
      const tasks = await Task.find({ agent: req.params.agentId });
      res.json(tasks);
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
}

export { uploadFile, getAgentTasks}