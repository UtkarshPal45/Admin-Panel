import express from "express";
import { login, register } from "../controllers/auth-controller.js";

const authRouter = express.Router();

// Admin Registration (Run Once Manually)
authRouter.post("/register", register);
authRouter.post("/login", login);

export default authRouter;
