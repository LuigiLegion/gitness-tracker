// Imports
import React from 'react';
import { NavLink } from 'react-router-dom';

// Component
const Logo = () => {
  return (
    <NavLink
      className="left navbar-logo text-style-bold text-color-gray"
      to="/"
    >
      Gitness Tracker
    </NavLink>
  )
};

// Exports
export default Logo;
