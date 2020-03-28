// Imports
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { slide as Menu } from 'react-burger-menu';

import { burgerStyles } from '../../styles';

// Component
const LinksBurger = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleStateChange = state => {
    setMenuOpen(state.isOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <Menu
      isOpen={menuOpen}
      onStateChange={state => handleStateChange(state)}
      right
      width="50%"
      styles={burgerStyles}
    >
      <div className="remove-outline">
        <div>
          <NavLink to="/about" onClick={closeMenu}>
            <span className="gray-text-color bold-text-style">About</span>
          </NavLink>
        </div>

        <div>
          <a
            href="https://github.com/LuigiLegion/gitness-tracker"
            target="_blank"
            rel="noopener noreferrer"
            onClick={closeMenu}
          >
            <span className="gray-text-color  bold-text-style">Source</span>
          </a>
        </div>

        <div>
          <a
            href="http://taluigi.netlify.com"
            target="_blank"
            rel="noopener noreferrer"
            onClick={closeMenu}
          >
            <span className="gray-text-color bold-text-style">Contact</span>
          </a>
        </div>
      </div>
    </Menu>
  );
};

export default LinksBurger;
