const VALID_PRIORITIES = ['low', 'medium', 'high'];


const validateCreateTodo = (data) => {
  if (!data || typeof data !== 'object') {
    const error = new Error('Invalid request payload');
    error.statusCode = 400;
    throw error;
  }

  if (data.title === undefined || data.title === null) {
    const error = new Error('Title is required');
    error.statusCode = 400;
    throw error;
  }

  if (typeof data.title !== 'string' || data.title.trim() === '') {
    const error = new Error('Title must be a non-empty string');
    error.statusCode = 400;
    throw error;
  }

  if (data.title.trim().length > 200) {
    const error = new Error('Title cannot exceed 200 characters');
    error.statusCode = 400;
    throw error;
  }

  if (data.description !== undefined && data.description !== null) {
    if (typeof data.description !== 'string') {
      const error = new Error('Description must be a string');
      error.statusCode = 400;
      throw error;
    }
  }

  if (data.priority !== undefined && data.priority !== null) {
    if (typeof data.priority !== 'string' || !VALID_PRIORITIES.includes(data.priority.toLowerCase())) {
      const error = new Error('Priority must be one of: low, medium, high');
      error.statusCode = 400;
      throw error;
    }
  }

  if (data.dueDate !== undefined && data.dueDate !== null) {
    if (isNaN(Date.parse(data.dueDate))) {
      const error = new Error('Due date must be a valid date');
      error.statusCode = 400;
      throw error;
    }
  }

  if (data.completed !== undefined && data.completed !== null) {
    if (typeof data.completed !== 'boolean') {
      const error = new Error('Completed must be a boolean');
      error.statusCode = 400;
      throw error;
    }
  }
};

const validateUpdateTodo = (data) => {
  if (!data || typeof data !== 'object') {
    const error = new Error('Invalid request payload');
    error.statusCode = 400;
    throw error;
  }

  if (data.title !== undefined && data.title !== null) {
    if (typeof data.title !== 'string' || data.title.trim() === '') {
      const error = new Error('Title must be a non-empty string');
      error.statusCode = 400;
      throw error;
    }

    if (data.title.trim().length > 200) {
      const error = new Error('Title cannot exceed 200 characters');
      error.statusCode = 400;
      throw error;
    }
  }

  if (data.description !== undefined && data.description !== null) {
    if (typeof data.description !== 'string') {
      const error = new Error('Description must be a string');
      error.statusCode = 400;
      throw error;
    }
  }

  if (data.priority !== undefined && data.priority !== null) {
    if (typeof data.priority !== 'string' || !VALID_PRIORITIES.includes(data.priority.toLowerCase())) {
      const error = new Error('Priority must be one of: low, medium, high');
      error.statusCode = 400;
      throw error;
    }
  }

  if (data.dueDate !== undefined && data.dueDate !== null) {
    if (isNaN(Date.parse(data.dueDate))) {
      const error = new Error('Due date must be a valid date');
      error.statusCode = 400;
      throw error;
    }
  }

  if (data.completed !== undefined && data.completed !== null) {
    if (typeof data.completed !== 'boolean') {
      const error = new Error('Completed must be a boolean');
      error.statusCode = 400;
      throw error;
    }
  }
};

module.exports = {
  validateCreateTodo,
  validateUpdateTodo
};
