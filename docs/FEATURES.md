# Application Features

This document outlines all implemented features of the Ziptrrip Todo Application Backend.

---

## Implemented Features

### 1. Create Todo
- Allows users to create a new Todo item with a title, optional description, priority, due date, and completion status.
- Automatically generates a unique UUID `id` (`crypto.randomUUID()`).
- Automatically assigns `createdAt` and `updatedAt` ISO timestamps.

### 2. View All Todos
- Retrieves the complete list of persisted Todos stored in `data/todos.json`.

### 3. View Single Todo
- Retrieves a specific Todo by its unique `id`.
- Returns a 404 error if no Todo matches the provided `id`.

### 4. Update Todo
- Updates existing Todo items by ID.
- Supports partial updates (all body fields optional).
- Protects server-managed fields (`id` and `createdAt`) from client modification.
- Automatically refreshes the `updatedAt` timestamp.

### 5. Delete Todo
- Removes a Todo item by ID from persistent storage.
- Returns 404 if the specified `id` does not exist.

### 6. Completion Status
- Tracks boolean completion state (`completed`: `true` / `false`). Defaults to `false` upon creation.

### 7. Priority Management
- Supports priority levels: `"low"`, `"medium"`, and `"high"`. Defaults to `"medium"` if omitted.

### 8. Description Field
- Supports optional detailed notes/text description for each Todo item.

### 9. Due Date Handling
- Accepts and validates optional due dates in standard ISO/date format.

### 10. Input Validation
- Validates request payloads before processing in the controller layer:
  - `title` is required for creation, must be a non-empty string under 200 characters.
  - Optional fields (`description`, `priority`, `dueDate`, `completed`) are verified for correct types/values if provided.

### 11. JSON Persistence
- Asynchronously persists all Todo data in `data/todos.json` using Node.js `fs/promises` API.
- Preserves state across server restarts.

### 12. Centralized Error Handling
- Global Express error handling middleware (`error.middleware.js`) returns consistent JSON error payloads.
- Preserves explicit HTTP status codes (e.g. 400 Bad Request, 404 Not Found).
- Protects internal implementation details and stack traces from exposure.

### 13. Unknown Route Handling
- Middleware (`notFound.middleware.js`) catches requests to undefined routes and responds with a JSON `404 Route not found` payload.
