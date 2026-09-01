const express = require('express');
const router = express.Router();
const todoController = require('../controllers/todo.controller');

// GET /api/todos - Get all todos
router.get('/', todoController.getTodos);

// GET /api/todos/:id - Get one todo by ID
router.get('/:id', todoController.getTodoById);

// POST /api/todos - Create a new todo
router.post('/', todoController.createTodo);

// PUT /api/todos/:id - Update a todo by ID
router.put('/:id', todoController.updateTodo);

// DELETE /api/todos/:id - Delete a todo by ID
router.delete('/:id', todoController.deleteTodo);

module.exports = router;
