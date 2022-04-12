// Imports
import React from 'react';
import { NavLink } from 'react-router-dom';

// Component
const Links = () => {
  return (
    <ul className="right">
      <li>
        <NavLink
          className="text-color-gray text-style-bold"
          to="/about"
        >
          About
        </NavLink>
      </li>

      <li>
        <a
          className="text-color-gray text-style-bold"
          href="https://github.com/LuigiLegion/gitness-tracker"
          target="_blank"
          rel="noopener noreferrer"
        >
          Source
        </a>
      </li>

      <li>
        <a
          className="text-color-gray text-style-bold padding-right"
          href="https://taluigi.netlify.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          Contact
        </a>
      </li>
    </ul>
  );
};

// Exports
export default Links;
