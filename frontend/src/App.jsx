import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { TodoListPage } from './pages/TodoListPage';
import './index.css';

export function App() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [counts, setCounts] = useState({ all: 0, active: 0, completed: 0 });

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
              onUpdateCounts={setCounts}
            />
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
