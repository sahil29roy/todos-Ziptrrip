import React, { useState, useMemo } from 'react';
import { Plus, Search, ChevronLeft, ChevronRight } from 'lucide-react';
import { TodoCard } from '../components/TodoCard';
import { mockTodos as initialTodos } from '../data/mockTodos';

export const TodoListPage = ({ activeFilter = 'all', onFilterChange }) => {
  const [todos, setTodos] = useState(initialTodos);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  const handleToggleComplete = (id) => {
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  const handleDelete = (id) => {
    setTodos((prev) => prev.filter((t) => t.id !== id));
  };

  const filteredTodos = useMemo(() => {
    return todos.filter((todo) => {
      if (activeFilter === 'active' && todo.completed) return false;
      if (activeFilter === 'completed' && !todo.completed) return false;

      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase();
        const matchesTitle = todo.title.toLowerCase().includes(query);
        const matchesDesc = todo.description?.toLowerCase().includes(query);
        if (!matchesTitle && !matchesDesc) return false;
      }

      return true;
    });
  }, [todos, activeFilter, searchQuery]);

  const totalItems = filteredTodos.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
  const validPage = Math.min(currentPage, totalPages);
  const startIndex = (validPage - 1) * pageSize;
  const paginatedTodos = filteredTodos.slice(startIndex, startIndex + pageSize);

  const startCount = totalItems === 0 ? 0 : startIndex + 1;
  const endCount = Math.min(startIndex + pageSize, totalItems);

  return (
    <div className="todo-dashboard">
      {/* Header */}
      <div className="dashboard-header">
        <div>
          <h1 className="dashboard-title">My Todos</h1>
          <p className="dashboard-subtitle">
            Manage your tasks and keep your work organized.
          </p>
        </div>

        <button className="btn btn-primary">
          <Plus size={16} />
          <span>Add Todo</span>
        </button>
      </div>

      {/* Toolbar */}
      <div className="dashboard-toolbar">
        <div className="filter-group" role="tablist">
          {['all', 'active', 'completed'].map((tab) => {
            const isActive = activeFilter === tab;
            return (
              <button
                key={tab}
                role="tab"
                aria-selected={isActive}
                className={`filter-btn ${isActive ? 'filter-btn-active' : ''}`}
                onClick={() => {
                  onFilterChange && onFilterChange(tab);
                  setCurrentPage(1);
                }}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            );
          })}
        </div>

        <div className="search-input-wrapper">
          <Search className="search-icon" size={16} />
          <input
            type="text"
            className="search-input"
            placeholder="Search todos..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            aria-label="Search todos"
          />
        </div>
      </div>

      {/* Todo List */}
      <div className="todo-list">
        {paginatedTodos.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '3rem 1rem', color: 'var(--muted-foreground)' }}>
            No tasks found.
          </div>
        ) : (
          paginatedTodos.map((todo) => (
            <TodoCard
              key={todo.id}
              todo={todo}
              onToggleComplete={handleToggleComplete}
              onDelete={handleDelete}
            />
          ))
        )}
      </div>

      {/* Pagination */}
      <div className="pagination-footer">
        <span className="pagination-info">
          Showing {startCount} to {endCount} of {todos.length} todos
        </span>

        <div className="pagination-controls">
          <button
            className="page-btn"
            disabled={validPage <= 1}
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            aria-label="Previous page"
          >
            <ChevronLeft size={16} />
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              className={`page-num ${page === validPage ? 'page-num-active' : ''}`}
              onClick={() => setCurrentPage(page)}
            >
              {page}
            </button>
          ))}

          <button
            className="page-btn"
            disabled={validPage >= totalPages}
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            aria-label="Next page"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};
