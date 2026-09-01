import React from 'react';
import { ListTodo, CheckCircle2, Circle, Settings, CheckSquare } from 'lucide-react';

export const Sidebar = ({
  activeFilter = 'all',
  onFilterChange,
  counts = { all: 5, active: 3, completed: 2 },
  isOpen = false,
  onClose
}) => {
  const navItems = [
    { id: 'all', label: 'All Todos', icon: ListTodo, count: counts.all },
    { id: 'active', label: 'Active', icon: Circle, count: counts.active },
    { id: 'completed', label: 'Completed', icon: CheckCircle2, count: counts.completed }
  ];

  const handleSelect = (id) => {
    if (onFilterChange) onFilterChange(id);
    if (onClose) onClose();
  };

  return (
    <>
      {isOpen && <div className="sidebar-overlay" onClick={onClose} aria-hidden="true" />}
      <aside className={`sidebar ${isOpen ? 'sidebar-open' : ''}`}>
        <div className="sidebar-brand">
          <div className="brand-icon-wrapper">
            <CheckSquare size={18} />
          </div>
          <span className="brand-name">Todo App</span>
        </div>

        <nav className="sidebar-nav">
          <div className="nav-section-title">Todos</div>
          <ul className="nav-list">
            {navItems.map(({ id, label, icon: Icon, count }) => {
              const isActive = activeFilter === id;
              return (
                <li key={id}>
                  <button
                    className={`nav-item ${isActive ? 'nav-item-active' : ''}`}
                    onClick={() => handleSelect(id)}
                  >
                    <Icon size={18} className="nav-item-icon" />
                    <span className="nav-item-label">{label}</span>
                    <span className={`badge ${isActive ? 'badge-active' : ''}`}>{count}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="sidebar-footer">
          <button className="nav-item">
            <Settings size={18} className="nav-item-icon" />
            <span className="nav-item-label">Settings</span>
          </button>
        </div>
      </aside>
    </>
  );
};
