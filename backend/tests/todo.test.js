const request = require('supertest');
const fs = require('fs').promises;
const path = require('path');
const app = require('../src/app');

const DATA_FILE = path.join(__dirname, '../data/todos.json');

describe('Todo API Endpoints', () => {
  let initialFileContent = '[]';

  beforeAll(async () => {
    try {
      initialFileContent = await fs.readFile(DATA_FILE, 'utf8');
    } catch {
      initialFileContent = '[]';
    }
  });

  beforeEach(async () => {
    // Reset persistence file to empty array before each test
    await fs.mkdir(path.dirname(DATA_FILE), { recursive: true });
    await fs.writeFile(DATA_FILE, JSON.stringify([], null, 2), 'utf8');
  });

  afterAll(async () => {
    // Restore initial data state after all tests complete
    await fs.writeFile(DATA_FILE, initialFileContent, 'utf8');
  });

  describe('GET /api/todos', () => {
    it('should return 200 OK and an array of todos', async () => {
      const response = await request(app).get('/api/todos');
      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(Array.isArray(response.body.data)).toBe(true);
    });
  });

  describe('POST /api/todos', () => {
    it('should create a new todo when valid input is provided', async () => {
      const payload = {
        title: 'Learn Express',
        description: 'Study Express middleware',
        priority: 'high'
      };

      const response = await request(app)
        .post('/api/todos')
        .send(payload);

      expect(response.status).toBe(201);
      expect(response.body.success).toBe(true);
      expect(response.body.message).toBe('Todo created successfully');
      expect(response.body.data).toHaveProperty('id');
      expect(response.body.data.title).toBe(payload.title);
      expect(response.body.data.description).toBe(payload.description);
      expect(response.body.data.priority).toBe(payload.priority);
      expect(response.body.data.completed).toBe(false);
      expect(response.body.data).toHaveProperty('createdAt');
      expect(response.body.data).toHaveProperty('updatedAt');
    });

    it('should return 400 Bad Request when title is missing', async () => {
      const payload = {
        description: 'Missing title'
      };

      const response = await request(app)
        .post('/api/todos')
        .send(payload);

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
      expect(response.body).toHaveProperty('message');
    });
  });

  describe('GET /api/todos/:id', () => {
    it('should return 200 OK and the todo for an existing ID', async () => {
      const createRes = await request(app)
        .post('/api/todos')
        .send({ title: 'Test Todo' });

      const todoId = createRes.body.data.id;

      const response = await request(app).get(`/api/todos/${todoId}`);
      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data.id).toBe(todoId);
      expect(response.body.data.title).toBe('Test Todo');
    });

    it('should return 404 Not Found for a non-existing ID', async () => {
      const response = await request(app).get('/api/todos/non-existent-id');
      expect(response.status).toBe(404);
      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe('Todo not found');
    });
  });

  describe('PUT /api/todos/:id', () => {
    it('should update an existing todo and return updated values', async () => {
      const createRes = await request(app)
        .post('/api/todos')
        .send({ title: 'Original Title', completed: false });

      const todoId = createRes.body.data.id;

      const updateRes = await request(app)
        .put(`/api/todos/${todoId}`)
        .send({ title: 'Updated Title', completed: true });

      expect(updateRes.status).toBe(200);
      expect(updateRes.body.success).toBe(true);
      expect(updateRes.body.message).toBe('Todo updated successfully');
      expect(updateRes.body.data.title).toBe('Updated Title');
      expect(updateRes.body.data.completed).toBe(true);
    });

    it('should return 404 Not Found when updating a non-existing todo', async () => {
      const response = await request(app)
        .put('/api/todos/non-existent-id')
        .send({ title: 'Updated Title' });

      expect(response.status).toBe(404);
      expect(response.body.success).toBe(false);
    });
  });

  describe('DELETE /api/todos/:id', () => {
    it('should delete an existing todo and return 200 OK', async () => {
      const createRes = await request(app)
        .post('/api/todos')
        .send({ title: 'Todo to delete' });

      const todoId = createRes.body.data.id;

      const deleteRes = await request(app).delete(`/api/todos/${todoId}`);
      expect(deleteRes.status).toBe(200);
      expect(deleteRes.body.success).toBe(true);
      expect(deleteRes.body.message).toBe('Todo deleted successfully');

      // Verify it no longer exists
      const getRes = await request(app).get(`/api/todos/${todoId}`);
      expect(getRes.status).toBe(404);
    });

    it('should return 404 Not Found when deleting a non-existing todo', async () => {
      const response = await request(app).delete('/api/todos/non-existent-id');
      expect(response.status).toBe(404);
      expect(response.body.success).toBe(false);
    });
  });

  describe('UNKNOWN ROUTE', () => {
    it('should return 404 Not Found JSON for an undefined route', async () => {
      const response = await request(app).get('/api/unknown');
      expect(response.status).toBe(404);
      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe('Route not found');
    });
  });
});
