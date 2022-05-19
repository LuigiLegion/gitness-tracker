import React from 'react';
import { NavLink } from 'react-router-dom';

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

export default Logo;
