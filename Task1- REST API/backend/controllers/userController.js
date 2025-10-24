import * as User from '../models/userModel.js';

export const createUser = (req, res) => {
    try {
        const { name, email, age } = req.body;
        
        if (!name || !email || !age) {
            return res
                .status(400)
                .json({ error: "name, email, and age are required" });
        }

        const newUser = User.createUser({ name, email, age });
        res.status(201).json({ message: "User created", user: newUser });
    } catch (error) {
        res.status(error.status || 500).json({ error: error.message });
    }
};

export const getAllUsers = (req, res) => {
    try {
        const users = User.findAllUsers();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: "Failed to retrieve users" });
    }
};

export const getUserByID = (req, res) => {
    try {
        const id = req.params.id;
        const user = User.findByID(id);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: "Failed to retrieve user" });
    }
};

export const updateUser = (req, res) => {
    try {
        const id = req.params.id;
        const { name, email, age } = req.body;

        const updateData = {};
        if (name) updateData.name = name;
        if (email) updateData.email = email;
        if (age) updateData.age = age;

        const updatedUser = User.updateUser(id, updateData);
        res.status(200).json({ message: "User updated", user: updatedUser });
    } catch (error) {
        res.status(error.status || 500).json({ error: error.message });
    }
};

export const deleteUser = (req, res) => {
    try {
        const id = req.params.id;
        User.deleteUser(id);
        res.json({ message: "User deleted" });
    } catch (error) {
        res.status(error.status || 500).json({ error: error.message });
    }
};