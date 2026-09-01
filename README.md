# Todo Application

## Overview
A full-featured Todo application backend built with Node.js and Express.js, featuring layered architecture, input validation, JSON file persistence, centralized error handling, and automated integration tests.

---

## Features
- **Create Todo**: Create todos with title, description, priority, due date, and completion status.
- **View All Todos**: Fetch all stored todos.
- **View Single Todo**: Retrieve a todo item by ID.
- **Update Todo**: Update existing todo properties with automatic `updatedAt` tracking.
- **Delete Todo**: Permanently remove a todo item by ID.
- **Input Validation**: Strict request body validation.
- **JSON Persistence**: Persistent storage in `data/todos.json`.
- **Centralized Error & 404 Handling**: Clean JSON responses for errors and unknown routes.

---

## Tech Stack

### Backend
- **Node.js**: Runtime environment
- **Express.js**: Web framework
- **JavaScript (CommonJS)**: Language
- **JSON File (`fs/promises`)**: Persistence
- **Jest & Supertest**: Automated integration testing

### Frontend
- **React** (scaffolded via Vite in `frontend/`)
- **JavaScript**

---

## Project Structure

```
.
├── backend/
│   ├── data/
│   │   └── todos.json
│   ├── src/
│   │   ├── controllers/
│   │   │   └── todo.controller.js
│   │   ├── middleware/
│   │   │   ├── error.middleware.js
│   │   │   └── notFound.middleware.js
│   │   ├── repositories/
│   │   │   └── todo.repository.js
│   │   ├── routes/
│   │   │   └── todo.routes.js
│   │   ├── services/
│   │   │   └── todo.service.js
│   │   ├── validators/
│   │   │   └── todo.validator.js
│   │   ├── app.js
│   │   └── server.js
│   ├── tests/
│   │   └── todo.test.js
│   └── package.json
├── docs/
│   ├── API.md
│   └── FEATURES.md
├── frontend/
├── .gitignore
└── README.md
```

---

## Installation

### Backend Setup
```bash
cd backend
npm install
```

### Frontend Setup
```bash
cd frontend
npm install
```

---

## Running the Backend

### Production / Standard Mode
```bash
cd backend
npm start
```

### Development Mode (with Watch Mode)
```bash
cd backend
npm run dev
```
The backend server runs on `http://localhost:5000` by default (configurable via `PORT` environment variable).

---

## Running the Frontend

```bash
cd frontend
npm run dev
```

---

## API Documentation

Detailed endpoint specifications, request bodies, and JSON response examples are documented in [docs/API.md](docs/API.md).

For a complete breakdown of implemented features, see [docs/FEATURES.md](docs/FEATURES.md).

---

## Testing

To run the automated API test suite:

```bash
cd backend
npm test
```
The test suite runs integration tests against all CRUD endpoints, validation checks, error cases, and unknown route handling using Jest and Supertest.
