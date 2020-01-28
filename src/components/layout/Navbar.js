// Imports
import React, { PureComponent } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Links from './Links';
import LinksBurger from './LinksBurger';
import Preloader from './Preloader';
import { navbarStyle } from '../../styles';

// Component
class Navbar extends PureComponent {
  constructor() {
    super();
    this.state = {
      width: 0,
    };
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  updateWindowDimensions() {
    this.setState({
      width: window.innerWidth,
    });
  }

  render() {
    const largeViewCheck = this.state.width > 1007;
    const { isLoading } = this.props;

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
  }
}

// Container
const mapStateToProps = state => ({
  isLoading: state.leaderboard.isLoading,
});

export default connect(mapStateToProps)(Navbar);

// Prop Types
Navbar.propTypes = {
  isLoading: PropTypes.bool,
};
