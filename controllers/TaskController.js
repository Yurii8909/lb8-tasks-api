// controllers/TaskController.js  ← назва файлу ОБОВ'ЯЗКОВО з великої!
const Task = require("../models/Task");

// CREATE
exports.createTask = async (req, res) => {
  try {
    const task = await Task.create(req.body);
    res.status(201).json(task);          
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// READ ALL
exports.getAllTasks = async (req, res) => {
  try { 
   const tasks = await Task.find().sort({ createdAt: -1 });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// READ BY ID
exports.getTaskById = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: "Task not found" });
    res.json(task);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// READ BY STATUS
exports.getTasksByStatus = async (req, res) => {
  try {
    const tasks = await Task.find({ status: req.params.status }).sort({ createdAt: -1 });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// UPDATE
exports.updateTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!task) return res.status(404).json({ message: "Task not found" });
    res.json(task);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// MARK AS COMPLETED
exports.markAsCompleted = async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, { status: "completed" }, { new: true });
    if (!task) return res.status(404).json({ message: "Task not found" });
    res.json(task);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// DELETE
exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) return res.status(404).json({ message: "Task not found" });
    res.json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// АГРЕГАЦІЯ
exports.getTasksSummary = async (req, res) => {
  try {
    const summary = await Task.aggregate([
      { $group: { _id: "$status", count: { $sum: 1 } } }
    ]);

    const result = { pending: 0, completed: 0 };
    summary.forEach(item => {
      if (item._id === "pending") result.pending = item.count;
      if (item._id === "completed") result.completed = item.count;
    });
    result.total = result.pending + result.completed;

    res.json(result); 
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};