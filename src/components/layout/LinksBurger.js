// Imports
import React, { PureComponent } from 'react';
import { NavLink } from 'react-router-dom';
import { slide as Menu } from 'react-burger-menu';

import { burgerStyles } from '../../styles';

// Component
class LinksBurger extends PureComponent {
  state = {
    menuOpen: false,
  };

  handleStateChange = state => {
    this.setState({
      menuOpen: state.isOpen,
    });
  };

  closeMenu = () => {
    this.setState({
      menuOpen: false,
    });
  };

  render() {
    return (
      <div>
        <Menu
          isOpen={this.state.menuOpen}
          onStateChange={state => this.handleStateChange(state)}
          right
          width="50%"
          styles={burgerStyles}
        >
          <div className="remove-outline">
            <div>
              <NavLink to="/about" onClick={() => this.closeMenu()}>
                <span className="gray-text-color bold-text-style">About</span>
              </NavLink>
            </div>

            <div>
              <a
                onClick={() => this.closeMenu()}
                href="https://github.com/LuigiLegion/gitness-tracker"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="gray-text-color  bold-text-style">Source</span>
              </a>
            </div>

            <div>
              <a
                onClick={() => this.closeMenu()}
                href="http://taluigi.netlify.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="gray-text-color bold-text-style">Contact</span>
              </a>
            </div>
          </div>
        </Menu>
      </div>
    );
  }
}

export default LinksBurger;
