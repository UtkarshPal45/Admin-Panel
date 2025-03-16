import Agent from "../models/Agent.js";

const addAgent = async (req, res) => {
    const { name, email, mobile, password } = req.body;
    
    try {
      const existingAgent = await Agent.findOne({ email });
      if (existingAgent) return res.status(400).json({ message: "Agent already exists" });
      
      const newAgent = new Agent({ name, email, mobile, password });
      await newAgent.save();
  
      res.status(201).json({ message: "Agent added successfully" });
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
}

const getAllAgents = async (req, res) => {
    try {
      const agents = await Agent.find();
      res.json(agents);
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
}

const getAgentById = async (req, res) => {
  try {
    const { id } = req.params;
    const agent = await Agent.findById(id);

    if (!agent) {
      return res.status(404).json({ message: "Agent not found" });
    }

    res.status(200).json(agent);
  } catch (error) {
    console.error("Error fetching agent by ID:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export {addAgent, getAllAgents,getAgentById}