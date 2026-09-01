const crypto = require('crypto');
const todoRepository = require('../repositories/todo.repository');

const getTodos = async () => {
  return await todoRepository.getAll();
};

const getTodoById = async (id) => {
  const todo = await todoRepository.getById(id);
  if (!todo) {
    const error = new Error('Todo not found');
    error.statusCode = 404;
    throw error;
  }
  return todo;
};

const createTodo = async (data) => {
  const now = new Date().toISOString();
  const todo = {
    id: crypto.randomUUID(),
    title: data.title.trim(),
    description: data.description !== undefined ? data.description : '',
    completed: data.completed !== undefined ? Boolean(data.completed) : false,
    priority: data.priority ? data.priority.toLowerCase() : 'medium',
    dueDate: data.dueDate || null,
    createdAt: now,
    updatedAt: now
  };

  return await todoRepository.create(todo);
};

const updateTodo = async (id, data) => {
  const existingTodo = await todoRepository.getById(id);
  if (!existingTodo) {
    const error = new Error('Todo not found');
    error.statusCode = 404;
    throw error;
  }

  const updates = {};
  if (data.title !== undefined) updates.title = data.title.trim();
  if (data.description !== undefined) updates.description = data.description;
  if (data.completed !== undefined) updates.completed = Boolean(data.completed);
  if (data.priority !== undefined) updates.priority = data.priority.toLowerCase();
  if (data.dueDate !== undefined) updates.dueDate = data.dueDate;

  updates.updatedAt = new Date().toISOString();

  return await todoRepository.update(id, updates);
};

const deleteTodo = async (id) => {
  const existingTodo = await todoRepository.getById(id);
  if (!existingTodo) {
    const error = new Error('Todo not found');
    error.statusCode = 404;
    throw error;
  }

  return await todoRepository.delete(id);
};

module.exports = {
  getTodos,
  getTodoById,
  createTodo,
  updateTodo,
  deleteTodo
};
