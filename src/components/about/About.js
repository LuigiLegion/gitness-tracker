// Imports
import React from 'react';
import { NavLink } from 'react-router-dom';

// Component
const About = () => {
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
                    <div>Gitness Tracker is a fitness tracker for coding.</div>
                  </li>

                  <br />

                  <li>
                    <div>
                      I made it as a tool for open source project maintainers to
                      hold friendly coding competitions and easily see who
                      contributes the most code over a given period of time.
                    </div>
                  </li>

                  <br />

                  <li>
                    <div>
                      Contributions are pulled from GitHub using their GraphQL
                      API and presented in the form of an organization, team, or
                      user leaderboard.
                    </div>
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
