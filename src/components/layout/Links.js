// Imports
import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

// Component
const Links = props => {
  // console.log('props in Links: ', props);

  return (
    <ul className="right">
      <li>
        <NavLink to="/about" className="gray-text-color">
          <span className="gray-text-color bold-text-style">About</span>
        </NavLink>
      </li>

      <li>
        <a
          href="https://github.com/LuigiLegion/gitness-tracker"
          target="_blank"
          rel="noopener noreferrer"
          className="gray-text-color"
        >
          <span className="gray-text-color bold-text-style">Source</span>
        </a>
      </li>

      <li>
        <a
          href="http://taluigi.netlify.com"
          target="_blank"
          rel="noopener noreferrer"
          className="gray-text-color"
        >
          <span className="gray-text-color bold-text-style">Contact</span>
        </a>
      </li>
    </ul>
  );
};

export default Links;

// Prop Types
Links.propTypes = {
  props: PropTypes.object,
};
