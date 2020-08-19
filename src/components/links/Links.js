// Imports
import React from 'react';
import { NavLink } from 'react-router-dom';

// Component
const Links = () => {
  return (
    <ul className="right">
      <li>
        <NavLink to="/about" className="text-color-gray">
          <span className="text-color-gray text-style-bold">About</span>
        </NavLink>
      </li>

      <li>
        <a
          className="text-color-gray"
          href="https://github.com/LuigiLegion/gitness-tracker"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className="text-color-gray text-style-bold">Source</span>
        </a>
      </li>

      <li>
        <a
          className="text-color-gray"
          href="https://taluigi.netlify.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className="text-color-gray text-style-bold">Contact</span>
        </a>
      </li>
    </ul>
  );
};

// Exports
export default Links;
