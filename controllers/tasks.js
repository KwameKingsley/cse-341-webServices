const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    try {
        const result = await mongodb.getDatabase().db().collection('tasks').find();
        const tasks = await result.toArray();
        res.status(200).json(tasks);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const getSingle = async (req, res) => {
    try {
        if (!ObjectId.isValid(req.params.id)) {
            return res.status(400).json('Invalid ID format.');
        }
        const taskId = new ObjectId(req.params.id);
        const result = await mongodb.getDatabase().db().collection('tasks').find({ _id: taskId });
        const tasks = await result.toArray();
        if (tasks.length > 0) {
            res.status(200).json(tasks[0]);
        } else {
            res.status(404).json({ message: 'Task not found' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const createTask = async (req, res) => {
    try {
        const task = {
            title: req.body.title,
            description: req.body.description,
            priority: req.body.priority,
            dueDate: req.body.dueDate,
            assignedTo: req.body.assignedTo,
            status: req.body.status,
            category: req.body.category
        };
        const response = await mongodb.getDatabase().db().collection('tasks').insertOne(task);
        if (response.acknowledged) {
            res.status(201).send();
        } else {
            res.status(500).json('Error occurred while this creating task.');
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const updateTask = async (req, res) => {
    try {
        if (!ObjectId.isValid(req.params.id)) {
            return res.status(400).json('Invalid ID format.');
        }
        const taskId = new ObjectId(req.params.id);
        const task = {
            title: req.body.title,
            description: req.body.description,
            priority: req.body.priority,
            dueDate: req.body.dueDate,
            assignedTo: req.body.assignedTo,
            status: req.body.status,
            category: req.body.category
        };
        const response = await mongodb.getDatabase().db().collection('tasks').replaceOne({ _id: taskId }, task);
        if (response.modifiedCount > 0) {
            res.status(204).send();
        } else {
            res.status(404).json('Task not found or no changes made.');
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const deleteTask = async (req, res) => {
    try {
        if (!ObjectId.isValid(req.params.id)) {
            return res.status(400).json('Invalid ID format.');
        }
        const taskId = new ObjectId(req.params.id);
        const response = await mongodb.getDatabase().db().collection('tasks').deleteOne({ _id: taskId });
        if (response.deletedCount > 0) {
            res.status(204).send();
        } else {
            res.status(404).json('Task not found.');
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = { getAll, getSingle, createTask, updateTask, deleteTask };