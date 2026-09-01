import React from 'react';
import { Calendar, Check, Edit2, Trash2 } from 'lucide-react';

export const TodoCard = ({ todo, onToggleComplete, onEdit, onDelete }) => {
  const { id, title, description, completed, dueDate } = todo;

  const formatDate = (dateString) => {
    if (!dateString) return null;
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    } catch {
      return dateString;
    }
  };

  return (
    <div className={`todo-card ${completed ? 'todo-card-completed' : ''}`}>
      <div className="todo-card-header">
        <button
          className={`todo-checkbox ${completed ? 'todo-checkbox-checked' : ''}`}
          onClick={() => onToggleComplete && onToggleComplete(id)}
          aria-label={completed ? 'Mark incomplete' : 'Mark complete'}
          type="button"
        >
          {completed && <Check size={12} className="check-icon" />}
        </button>

        <div className="todo-content">
          <h3 className={`todo-title ${completed ? 'todo-title-completed' : ''}`}>
            {title}
          </h3>

          {description && (
            <p className={`todo-description ${completed ? 'todo-desc-completed' : ''}`}>
              {description}
            </p>
          )}

          {dueDate && (
            <div className="todo-meta">
              <Calendar size={13} />
              <span>{formatDate(dueDate)}</span>
            </div>
          )}
        </div>

        <div className="todo-actions">
          <button
            className="icon-btn"
            aria-label="Edit todo"
            title="Edit todo"
            onClick={() => onEdit && onEdit(todo)}
          >
            <Edit2 size={15} />
          </button>
          <button
            className="icon-btn icon-btn-danger"
            aria-label="Delete todo"
            title="Delete todo"
            onClick={() => onDelete && onDelete(id)}
          >
            <Trash2 size={15} />
          </button>
        </div>
      </div>
    </div>
  );
};
