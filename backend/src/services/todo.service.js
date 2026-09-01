exports.getTodos = async () => [];
exports.getTodoById = async (id) => null;
exports.createTodo = async (data) => ({ id: 'placeholder', ...data });
exports.updateTodo = async (id, data) => ({ id, ...data });
exports.deleteTodo = async (id) => true;
