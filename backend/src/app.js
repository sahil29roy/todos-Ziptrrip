const express = require('express');
const cors = require('cors');
const todoRoutes = require('./routes/todo.routes');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Todo API Routes
app.use('/api/todos', todoRoutes);

module.exports = app;
