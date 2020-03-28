// Imports
import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Links from '../links/Links';
import LinksBurger from '../links/LinksBurger';
import Preloader from './Preloader';
import { navbarStyle } from '../../styles';

// Component
const Navbar = ({ isLoading }) => {
  const [width, setWidth] = useState(window.innerWidth);

  const largeViewCheck = width > 1007;

  const updateNavbarDimensions = () => {
    setWidth(window.innerWidth);
  };

  useEffect(() => {
    updateNavbarDimensions();
    window.addEventListener('resize', updateNavbarDimensions);

    return () => {
      window.removeEventListener('resize', updateNavbarDimensions);
      updateNavbarDimensions();
    };
  }, [width]);

  return (
    <div className="navbar-fixed">
      <nav
        className="nav-wrapper grey lighten-5 preloader-container"
        style={navbarStyle}
      >
        <div>
          <NavLink
            to="/"
            className="left brand-logo navbar-logo name-text-positioning"
          >
            <span className="gray-text-color bold-text-style">
              Gitness Tracker
            </span>
          </NavLink>

          {largeViewCheck ? <Links /> : <LinksBurger />}
        </div>

        <div>{isLoading ? <Preloader /> : null}</div>
      </nav>
    </div>
  );
};

// Container
const mapStateToProps = state => ({
  isLoading: state.leaderboard.isLoading,
});

export default connect(mapStateToProps)(Navbar);

// Prop Types
Navbar.propTypes = {
  isLoading: PropTypes.bool,
};