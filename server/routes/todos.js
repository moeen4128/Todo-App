// routes/todos.js
const express = require('express');
const jwt = require('jsonwebtoken');
const Todo = require('../models/Todo');
const router = express.Router();

// Middleware to verify JWT token
const authenticateToken = (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) return res.status(401).json({ message: "No token, authorization denied" });

    try {
        const decoded = jwt.verify(token.split(" ")[1], 'your_jwt_secret_key');
        req.user = decoded.userId;
        next();
    } catch (err) {
        res.status(403).json({ message: "Invalid token" });
    }
};

// Get user to-dos
router.get('/todos', authenticateToken, async (req, res) => {
    try {
        const todos = await Todo.find({ userId: req.user });
        res.status(200).json(todos);
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
});

// Add new to-do
router.post('/todos', authenticateToken, async (req, res) => {
    try {
        const { title,completed } = req.body;
        const newTodo = new Todo({
            userId: req.user,
            title:title,
            completed: completed || false 
        });
        await newTodo.save();
        res.status(201).json(newTodo);
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
});

// Delete a to-do
router.delete('/todos/:id', authenticateToken, async (req, res) => {
    try {
        await Todo.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Todo deleted" });
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;
