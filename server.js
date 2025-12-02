// server.js
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());

// Підключення до MongoDB Atlas
mongoose.connect(process.env.DB_URI)
  .then(() => console.log("Підключено до MongoDB Atlas"))
  .catch(err => console.error("Помилка підключення:", err));

// Правильне підключення роутів (обов’язково /api/tasks)
app.use('/api/tasks', require('./routes/taskRoutes'));

// Домашня сторінка
app.get('/', (req, res) => {
  res.send('<h2>ЛБ 8 успішно працює!</h2><p>API: <a href="/api/tasks">/api/tasks</a> | <a href="/api/tasks/summary">/summary</a>');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Сервер запущено на порту ${PORT}`));