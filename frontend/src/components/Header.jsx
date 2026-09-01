import React, { useState } from 'react';
import { Moon, Sun, Menu } from 'lucide-react';

export const Header = ({ onToggleMobileSidebar }) => {
  const [isDarkMode, setIsDarkMode] = useState(true);

  return (
    <header className="header">
      <button
        className="icon-btn mobile-menu-btn"
        onClick={onToggleMobileSidebar}
        aria-label="Toggle mobile menu"
      >
        <Menu size={18} />
      </button>

      <div style={{ marginLeft: 'auto' }}>
        <button
          className="icon-btn"
          onClick={() => setIsDarkMode(!isDarkMode)}
          aria-label="Toggle theme"
          title="Toggle theme"
        >
          {isDarkMode ? <Moon size={18} /> : <Sun size={18} />}
        </button>
      </div>
    </header>
  );
};
