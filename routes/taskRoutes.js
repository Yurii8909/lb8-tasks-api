// routes/taskRoutes.js
const express = require('express');
const router = express.Router();

const taskController = require('../controllers/TaskController');

router.post('/', taskController.createTask);
router.get('/', taskController.getAllTasks);
router.get('/status/:status', taskController.getTasksByStatus);
router.get('/summary', taskController.getTasksSummary);     
router.get('/:id', taskController.getTaskById);
router.put('/:id', taskController.updateTask);
router.patch('/:id/complete', taskController.markAsCompleted);
router.delete('/:id', taskController.deleteTask);

module.exports = router;