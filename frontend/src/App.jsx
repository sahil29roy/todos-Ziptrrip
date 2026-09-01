import React, { useState, useMemo } from 'react';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { TodoListPage } from './pages/TodoListPage';
import { mockTodos } from './data/mockTodos';
import './index.css';

export function App() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  const counts = useMemo(() => {
    const all = mockTodos.length;
    const completed = mockTodos.filter((t) => t.completed).length;
    const active = all - completed;
    return { all, active, completed };
  }, []);

  return (
    <div className="app-container">
      <Sidebar
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
        counts={counts}
        isOpen={isMobileSidebarOpen}
        onClose={() => setIsMobileSidebarOpen(false)}
      />

      <div className="app-main-wrapper">
        <Header onToggleMobileSidebar={() => setIsMobileSidebarOpen((prev) => !prev)} />
        <main className="app-content-container">
          <div className="app-content-inner">
            <TodoListPage
              activeFilter={activeFilter}
              onFilterChange={setActiveFilter}
            />
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
