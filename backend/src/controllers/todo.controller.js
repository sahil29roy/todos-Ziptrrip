
const todoService = require('../services/todo.service');
const {
  validateCreateTodo,
  validateUpdateTodo
} = require('../validators/todo.validator');


const getTodos = async (req, res, next) => {
  try {
    const todos = await todoService.getTodos();

    res.status(200).json({
      success: true,
      data: todos
    });
  } catch (error) {
    next(error);
  }
};


const getTodo = async (req, res, next) => {
  try {
    const { id } = req.params;
    const todo = await todoService.getTodoById(id);

    res.status(200).json({
      success: true,
      data: todo
    });
  } catch (error) {
    next(error);
  }
};


const createTodo = async (req, res, next) => {
  try {
    validateCreateTodo(req.body);

    const newTodo = await todoService.createTodo(req.body);

    res.status(201).json({
      success: true,
      data: newTodo,
      message: 'Todo created successfully'
    });
  } catch (error) {
    next(error);
  }
};


const updateTodo = async (req, res, next) => {
  try {
    const { id } = req.params;

    validateUpdateTodo(req.body);

    const updatedTodo = await todoService.updateTodo(id, req.body);

    res.status(200).json({
      success: true,
      data: updatedTodo,
      message: 'Todo updated successfully'
    });
  } catch (error) {
    next(error);
  }
};


const deleteTodo = async (req, res, next) => {
  try {
    const { id } = req.params;

    await todoService.deleteTodo(id);

    res.status(200).json({
      success: true,
      message: 'Todo deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getTodos,
  getTodo,
  getTodoById: getTodo,
  createTodo,
  updateTodo,
  deleteTodo
};
