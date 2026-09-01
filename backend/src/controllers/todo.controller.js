

exports.getTodos = async (req, res, next) => {
  try {
    res.status(501).json({ success: false, message: 'getTodos not implemented (Part 2)' });
  } catch (error) {
    next(error);
  }
};

exports.getTodoById = async (req, res, next) => {
  try {
    res.status(501).json({ success: false, message: 'getTodoById not implemented (Part 2)' });
  } catch (error) {
    next(error);
  }
};

exports.createTodo = async (req, res, next) => {
  try {
    res.status(501).json({ success: false, message: 'createTodo not implemented (Part 2)' });
  } catch (error) {
    next(error);
  }
};

exports.updateTodo = async (req, res, next) => {
  try {
    res.status(501).json({ success: false, message: 'updateTodo not implemented (Part 2)' });
  } catch (error) {
    next(error);
  }
};

exports.deleteTodo = async (req, res, next) => {
  try {
    res.status(501).json({ success: false, message: 'deleteTodo not implemented (Part 2)' });
  } catch (error) {
    next(error);
  }
};
