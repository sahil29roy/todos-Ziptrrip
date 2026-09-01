const fs = require('fs').promises;
const path = require('path');

const DATA_FILE = path.join(__dirname, '../../data/todos.json');

const readTodos = async () => {
  try {
    const data = await fs.readFile(DATA_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    if (error.code === 'ENOENT') {
      const dir = path.dirname(DATA_FILE);
      await fs.mkdir(dir, { recursive: true });
      await fs.writeFile(DATA_FILE, JSON.stringify([], null, 2), 'utf8');
      return [];
    }
    throw error;
  }
};

const writeTodos = async (todos) => {
  const dir = path.dirname(DATA_FILE);
  await fs.mkdir(dir, { recursive: true });
  await fs.writeFile(DATA_FILE, JSON.stringify(todos, null, 2), 'utf8');
};

const getAll = async () => {
  return await readTodos();
};

const getById = async (id) => {
  const todos = await readTodos();
  const todo = todos.find((t) => t.id === id);
  return todo || null;
};

const create = async (todo) => {
  const todos = await readTodos();
  todos.push(todo);
  await writeTodos(todos);
  return todo;
};

const update = async (id, updates) => {
  const todos = await readTodos();
  const index = todos.findIndex((t) => t.id === id);
  if (index === -1) {
    return null;
  }
  const updatedTodo = {
    ...todos[index],
    ...updates
  };
  todos[index] = updatedTodo;
  await writeTodos(todos);
  return updatedTodo;
};

const deleteById = async (id) => {
  const todos = await readTodos();
  const index = todos.findIndex((t) => t.id === id);
  if (index === -1) {
    return false;
  }
  todos.splice(index, 1);
  await writeTodos(todos);
  return true;
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  delete: deleteById
};
