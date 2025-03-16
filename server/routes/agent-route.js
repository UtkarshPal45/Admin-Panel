import express from "express"
import authMiddleware from "../middleware/authMiddleware.js"
import { addAgent, getAllAgents ,getAgentById} from "../controllers/agent-controller.js"

const agentRouter =  express.Router()

agentRouter.get('/',authMiddleware, getAllAgents)
agentRouter.get('/:id',authMiddleware, getAgentById)
agentRouter.post('/add',authMiddleware, addAgent)

export default agentRouter