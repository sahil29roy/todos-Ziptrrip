# Ziptrrip Technical Assignment — Full Stack Todo Application

## Overview
A production-ready Full Stack Todo application built with **Node.js, Express.js** on the backend and **React (Vite)** on the frontend. The application features layered backend architecture (Controller-Service-Repository), JSON file persistence, comprehensive body validation, centralized error handling, and a sleek dark-themed React dashboard with multi-page navigation, full CRUD capabilities, and query-parameter based detail view (`/todo?id=<todo-id>`).

---

## Key Features

### Backend
- **RESTful API Architecture**: Strict separation of concerns (Routes → Controllers → Service Layer → Repository → JSON File Storage).
- **CRUD Endpoints**:
  - `GET /api/todos`: Fetch all todo items.
  - `GET /api/todos/:id`: Retrieve a specific todo item by ID.
  - `POST /api/todos`: Create a new todo item with input validation.
  - `PUT /api/todos/:id`: Update existing todo item fields.
  - `DELETE /api/todos/:id`: Permanently delete a todo item.
- **Input Validation**: Rejects missing titles, empty strings, invalid priority values, and invalid boolean completion states.
- **Persistence**: Data saved in `backend/data/todos.json` with asynchronous file locking/reading routines (`fs/promises`).
- **Error Middleware**: Centralized 404 Not Found and 500 Global Error Handling.
- **Automated Tests**: Jest + Supertest test suite.

### Frontend
- **Dark Visual Dashboard**: Styled with custom CSS variables matching modern dark mode standards (`#09090b` background, `#121215` card surfaces, `#8b5cf6` primary purple accents).
- **Multi-Page Navigation**:
  - **Main Dashboard (`/todos`)**: Overview of todos, search bar, status tabs (`All`, `Active`, `Completed`), and pagination controls.
  - **Todo Detail Page (`/todo?id=<todo-id>`)**: Comprehensive detail view receiving the Todo ID strictly via query parameter, displaying complete metadata (status, priority, due date, created/updated dates) with back navigation.
- **CRUD Operations & Modals**:
  - **Create Modal**: Add todos with Title, Description, Priority (`low`/`medium`/`high`), and Due Date.
  - **Edit Modal**: Edit existing tasks in place across both list and detail views.
  - **Delete Modal**: Destructive confirmation dialog before task deletion.
  - **Completion Toggle**: Direct checkbox toggles with optimistic UI state updates and server synchronization.
- **State Handling**: Comprehensive loading indicators, empty search/filter states, and missing/invalid Todo ID handling.

---

## Tech Stack

| Layer | Technology |
|---|---|
| **Frontend Framework** | React (Vite) |
| **Frontend Styling** | Vanilla CSS (CSS Variables, Flexbox/Grid) |
| **Icons** | Lucide React |
| **Backend Runtime** | Node.js |
| **Backend Framework** | Express.js |
| **Persistence** | JSON file (`backend/data/todos.json`) |
| **Testing** | Jest + Supertest |

---

## Project Structure

```
.
├── backend/
│   ├── data/
│   │   └── todos.json            # Persistent JSON database
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
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Header.jsx
│   │   │   ├── Sidebar.jsx
│   │   │   ├── TodoCard.jsx
│   │   │   ├── TodoModal.jsx
│   │   │   └── DeleteConfirmModal.jsx
│   │   ├── pages/
│   │   │   ├── TodoListPage.jsx
│   │   │   └── TodoDetailPage.jsx
│   │   ├── services/
│   │   │   └── todoApi.js        # Native fetch API service
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
├── docs/
│   ├── API.md
│   └── FEATURES.md
├── .gitignore
└── README.md
```

---

## Setup & Running Instructions

### 1. Installation

Install dependencies for both backend and frontend:

```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### 2. Running the Backend Server

```bash
cd backend
npm start
```
*The Express backend will start on **`http://localhost:5000`**.*

### 3. Running the Frontend Development Server

In a separate terminal window:

```bash
cd frontend
npm run dev
```
*The Vite frontend dev server will launch (typically at **`http://localhost:3000`** or **`http://localhost:5173`**).*

---

## API Reference Summary

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/todos` | Retrieve all todo items |
| `GET` | `/api/todos/:id` | Retrieve single todo item by ID |
| `POST` | `/api/todos` | Create a new todo item |
| `PUT` | `/api/todos/:id` | Update an existing todo item |
| `DELETE` | `/api/todos/:id` | Delete a todo item by ID |

Full request payload format and response structures are detailed in [`docs/API.md`](docs/API.md).

---

## Running Automated Tests

To execute the backend Jest & Supertest integration suite:

```bash
cd backend
npm test
```
