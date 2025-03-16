import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Admin from "../models/Admin.js";

const login = async (req, res) => {
    const { email, password } = req.body;
    
    try {
      const admin = await Admin.findOne({ email });
      if (!admin) return res.status(400).json({ message: "Invalid credentials" });
  
      const isMatch = await bcrypt.compare(password, admin.password);
      if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });
  
      const token = jwt.sign({ id: admin._id, role: "admin" }, process.env.JWT_SECRET_KEY, { expiresIn: "1h" });
  
      res.json({ token,  message: "Login successful" });
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
}

const register = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) return res.status(400).json({ message: "Admin already exists" });

    const newAdmin = new Admin({ email, password });
    await newAdmin.save();

    res.status(201).json({ message: "Admin registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
}

export {login, register}

