const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

async function request(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`;

  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  if (config.body && typeof config.body === 'object') {
    config.body = JSON.stringify(config.body);
  }

  const response = await fetch(url, config);
  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    const error = new Error(data.message || `Request failed with status ${response.status}`);
    error.status = response.status;
    error.data = data;
    throw error;
  }

  return data;
}

export const todoApi = {

  async getTodos() {
    return request('/todos');
  },


  async getTodoById(id) {
    return request(`/todos/${id}`);
  },


  async createTodo(todoData) {
    return request('/todos', {
      method: 'POST',
      body: todoData,
    });
  },


  async updateTodo(id, todoData) {
    return request(`/todos/${id}`, {
      method: 'PUT',
      body: todoData,
    });
  },


  async deleteTodo(id) {
    return request(`/todos/${id}`, {
      method: 'DELETE',
    });
  },
};

export default todoApi;
