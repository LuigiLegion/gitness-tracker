// Imports
import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

// Component
const About = props => {
  // console.log('props in About: ', props);

  return (
    <div className="dashboard container">
      <div className="row">
        <div className="col s12 m12">
          <div className="section">
            <div className="card z-depth-0">
              <div className="card-content grey-text text-darken-3">
                <span className="card-title">
                  <span className="bold-text-style">About</span>
                </span>

                <ul className="about">
                  <li>
                    <div>Placeholder</div>
                  </li>
                </ul>

                <br />

                <ul>
                  <li>
                    <NavLink to="/">
                      <span className="bold-text-style">
                        ← Back To Main Page
                      </span>
                    </NavLink>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;

// Prop Types
About.propTypes = {
  props: PropTypes.object,
};
