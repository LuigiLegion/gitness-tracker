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
      styles={burgerStyles}
      isOpen={menuOpen}
      right
      width="50%"
      onStateChange={state => handleStateChange(state)}
    >
      <div className="outline-none">
        <div>
          <NavLink
            className="text-color-gray text-style-bold"
            to="/about"
            onClick={closeMenu}
          >
            About
          </NavLink>
        </div>

        <div>
          <a
            className="text-color-gray text-style-bold"
            href="https://github.com/LuigiLegion/gitness-tracker"
            target="_blank"
            rel="noopener noreferrer"
            onClick={closeMenu}
          >
            Source
          </a>
        </div>

        <div>
          <a
            className="text-color-gray text-style-bold"
            href="https://taluigi.netlify.com"
            target="_blank"
            rel="noopener noreferrer"
            onClick={closeMenu}
          >
            Contact
          </a>
        </div>
      </div>
    </Menu>
  );
};

// Exports
export default LinksBurger;
