import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Plus, Search, ChevronLeft, ChevronRight } from 'lucide-react';
import { TodoCard } from '../components/TodoCard';
import { TodoModal } from '../components/TodoModal';
import { DeleteConfirmModal } from '../components/DeleteConfirmModal';
import { todoApi } from '../services/todoApi';
import { mockTodos as fallbackTodos } from '../data/mockTodos';

export const TodoListPage = ({ activeFilter = 'all', onFilterChange, onUpdateCounts }) => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  // Modal States
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingTodo, setEditingTodo] = useState(null);
  const [deletingTodo, setDeletingTodo] = useState(null);

  // Fetch todos from Backend API
  const loadTodos = useCallback(async () => {
    try {
      setLoading(true);
      const res = await todoApi.getTodos();
      if (res && res.success && Array.isArray(res.data)) {
        setTodos(res.data);
      } else {
        setTodos(fallbackTodos);
      }
    } catch {
      // If backend server is offline, fallback gracefully to initial state
      setTodos((prev) => (prev.length > 0 ? prev : fallbackTodos));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadTodos();
  }, [loadTodos]);

  // Sync counts to parent App Layout
  useEffect(() => {
    if (onUpdateCounts) {
      const all = todos.length;
      const completed = todos.filter((t) => t.completed).length;
      const active = all - completed;
      onUpdateCounts({ all, active, completed });
    }
  }, [todos, onUpdateCounts]);

  // CRUD Operations using API Service
  const handleCreateTodo = async (formData) => {
    try {
      const res = await todoApi.createTodo(formData);
      if (res && res.success && res.data) {
        setTodos((prev) => [res.data, ...prev]);
      } else {
        await loadTodos();
      }
    } catch {
      // Fallback local addition if API fails
      const newTodo = {
        id: String(Date.now()),
        ...formData,
        completed: false,
        createdAt: new Date().toISOString()
      };
      setTodos((prev) => [newTodo, ...prev]);
    }
  };

  const handleUpdateTodo = async (formData) => {
    if (!editingTodo) return;
    try {
      const res = await todoApi.updateTodo(editingTodo.id, formData);
      if (res && res.success && res.data) {
        setTodos((prev) => prev.map((t) => (t.id === editingTodo.id ? res.data : t)));
      } else {
        await loadTodos();
      }
    } catch {
      setTodos((prev) =>
        prev.map((t) => (t.id === editingTodo.id ? { ...t, ...formData } : t))
      );
    }
  };

  const handleToggleComplete = async (id) => {
    const target = todos.find((t) => t.id === id);
    if (!target) return;

    const updatedStatus = !target.completed;
    // Optimistic UI update
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: updatedStatus } : t))
    );

    try {
      await todoApi.updateTodo(id, { completed: updatedStatus });
    } catch {
      // Revert on error
      setTodos((prev) =>
        prev.map((t) => (t.id === id ? { ...t, completed: target.completed } : t))
      );
    }
  };

  const handleDeleteTodo = async () => {
    if (!deletingTodo) return;
    const targetId = deletingTodo.id;

    // Optimistic UI update
    setTodos((prev) => prev.filter((t) => t.id !== targetId));

    try {
      await todoApi.deleteTodo(targetId);
    } catch {
      await loadTodos();
    }
  };

  // Filter & Search
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

  // Pagination calculation
  const totalItems = filteredTodos.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
  const validPage = Math.min(currentPage, totalPages);
  const startIndex = (validPage - 1) * pageSize;
  const paginatedTodos = filteredTodos.slice(startIndex, startIndex + pageSize);

  const startCount = totalItems === 0 ? 0 : startIndex + 1;
  const endCount = Math.min(startIndex + pageSize, totalItems);

  return (
    <div className="todo-dashboard">
      {/* Dashboard Header */}
      <div className="dashboard-header">
        <div>
          <h1 className="dashboard-title">My Todos</h1>
          <p className="dashboard-subtitle">
            Manage your tasks and keep your work organized.
          </p>
        </div>

        <button className="btn btn-primary" onClick={() => setIsAddModalOpen(true)}>
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
        {loading ? (
          <div style={{ textAlign: 'center', padding: '3rem 1rem', color: 'var(--muted-foreground)' }}>
            Loading todos...
          </div>
        ) : paginatedTodos.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '3rem 1rem', color: 'var(--muted-foreground)' }}>
            No tasks found.
          </div>
        ) : (
          paginatedTodos.map((todo) => (
            <TodoCard
              key={todo.id}
              todo={todo}
              onToggleComplete={handleToggleComplete}
              onEdit={(t) => setEditingTodo(t)}
              onDelete={() => setDeletingTodo(todo)}
            />
          ))
        )}
      </div>

      {/* Pagination Footer */}
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

      {/* Add Modal */}
      <TodoModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSubmit={handleCreateTodo}
      />

      {/* Edit Modal */}
      <TodoModal
        isOpen={Boolean(editingTodo)}
        initialData={editingTodo}
        onClose={() => setEditingTodo(null)}
        onSubmit={handleUpdateTodo}
      />

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        isOpen={Boolean(deletingTodo)}
        todoTitle={deletingTodo?.title || ''}
        onClose={() => setDeletingTodo(null)}
        onConfirm={handleDeleteTodo}
      />
    </div>
  );
};
