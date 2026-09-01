# API Documentation

## Overview
Base URL: `http://localhost:5000/api`  
Content-Type: `application/json`

---

## Endpoints

### 1. Get All Todos
Retrieves all persisted todos.

- **HTTP Method**: `GET`
- **Endpoint**: `/api/todos`
- **Headers**: None
- **Parameters**: None

#### Successful Response (200 OK)
```json
{
  "success": true,
  "data": [
    {
      "id": "8812060a-842d-449c-b544-50ed8e4afeeb",
      "title": "Learn Express",
      "description": "Study Express middleware",
      "completed": false,
      "priority": "high",
      "dueDate": "2026-09-05T00:00:00.000Z",
      "createdAt": "2026-09-01T19:51:43.918Z",
      "updatedAt": "2026-09-01T19:51:43.918Z"
    }
  ]
}
```

---

### 2. Get Single Todo
Retrieves a single todo by its unique identifier.

- **HTTP Method**: `GET`
- **Endpoint**: `/api/todos/:id`
- **URL Parameters**:
  - `id` (String, Required) — Unique ID of the Todo.

#### Successful Response (200 OK)
```json
{
  "success": true,
  "data": {
    "id": "8812060a-842d-449c-b544-50ed8e4afeeb",
    "title": "Learn Express",
    "description": "Study Express middleware",
    "completed": false,
    "priority": "high",
    "dueDate": "2026-09-05T00:00:00.000Z",
    "createdAt": "2026-09-01T19:51:43.918Z",
    "updatedAt": "2026-09-01T19:51:43.918Z"
  }
}
```

#### Error Response (404 Not Found)
```json
{
  "success": false,
  "message": "Todo not found"
}
```

---

### 3. Create Todo
Creates a new Todo item.

- **HTTP Method**: `POST`
- **Endpoint**: `/api/todos`
- **Request Body**:
```json
{
  "title": "Learn Express",
  "description": "Study Express middleware",
  "priority": "high",
  "dueDate": "2026-09-05"
}
```

#### Fields:
- `title` (String, **Required**): Non-empty string, max 200 characters.
- `description` (String, Optional): Description text.
- `priority` (String, Optional): Allowed values: `"low"`, `"medium"`, `"high"`. Default: `"medium"`.
- `dueDate` (String, Optional): Valid ISO/parseable date string.
- `completed` (Boolean, Optional): Default `false`.

#### Successful Response (201 Created)
```json
{
  "success": true,
  "data": {
    "id": "8812060a-842d-449c-b544-50ed8e4afeeb",
    "title": "Learn Express",
    "description": "Study Express middleware",
    "completed": false,
    "priority": "high",
    "dueDate": "2026-09-05",
    "createdAt": "2026-09-01T19:51:43.918Z",
    "updatedAt": "2026-09-01T19:51:43.918Z"
  },
  "message": "Todo created successfully"
}
```

#### Error Response (400 Bad Request)
```json
{
  "success": false,
  "message": "Title is required"
}
```

---

### 4. Update Todo
Updates an existing Todo item by ID.

- **HTTP Method**: `PUT`
- **Endpoint**: `/api/todos/:id`
- **URL Parameters**:
  - `id` (String, Required) — Unique ID of the Todo.
- **Request Body**: (All fields optional)
```json
{
  "title": "Updated Title",
  "completed": true,
  "priority": "low"
}
```

#### Successful Response (200 OK)
```json
{
  "success": true,
  "data": {
    "id": "8812060a-842d-449c-b544-50ed8e4afeeb",
    "title": "Updated Title",
    "description": "Study Express middleware",
    "completed": true,
    "priority": "low",
    "dueDate": "2026-09-05",
    "createdAt": "2026-09-01T19:51:43.918Z",
    "updatedAt": "2026-09-01T19:55:00.123Z"
  },
  "message": "Todo updated successfully"
}
```

#### Error Response (404 Not Found)
```json
{
  "success": false,
  "message": "Todo not found"
}
```

---

### 5. Delete Todo
Deletes a Todo item by ID.

- **HTTP Method**: `DELETE`
- **Endpoint**: `/api/todos/:id`
- **URL Parameters**:
  - `id` (String, Required) — Unique ID of the Todo.

#### Successful Response (200 OK)
```json
{
  "success": true,
  "message": "Todo deleted successfully"
}
```

#### Error Response (404 Not Found)
```json
{
  "success": false,
  "message": "Todo not found"
}
```

---

### 6. Unknown Route Response
Requesting undefined endpoints returns a 404 JSON response.

- **HTTP Method**: Any
- **Endpoint**: `/api/unknown`

#### Response (404 Not Found)
```json
{
  "success": false,
  "message": "Route not found"
}
```
