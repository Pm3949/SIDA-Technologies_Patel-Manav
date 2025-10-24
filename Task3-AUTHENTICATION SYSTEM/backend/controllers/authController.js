import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { SECRET } from "../config.js";
import * as authModel from "../models/authModel.js";

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = authModel.createUser({
      name,
      email,
      password: hashPassword,
    });

    res
      .status(201)
      .json({ message: "Registered successfully", userId: newUser.id });
  } catch (error) {
    res.status(error.status || 500).json({ error: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "email and password required" });
    }

    const user = authModel.findByEmail(email);
    if (!user) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const token = jwt.sign({ id: user.id, email: user.email }, SECRET, {
      expiresIn: "7d",
    });

    res.json({ message: "Login successful", token });
  } catch (error) {
    res.status(500).json({ error: "Server error during login" });
  }
};
