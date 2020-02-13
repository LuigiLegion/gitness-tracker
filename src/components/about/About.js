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
            <div className="card">
              <div className="card-content grey-text text-darken-3">
                <span className="card-title">
                  <span className="bold-text-style">About</span>
                </span>

                <ul className="about">
                  <li>Gitness Tracker is a fitness tracker for coding.</li>

                  <br />

                  <li>
                    I built it as a tool that helps open source project
                    maintainers hold friendly code contribution competitions by
                    allowing them to determine who contributed the most code
                    over a given period of time.
                  </li>

                  <li>
                    Contributions are pulled from GitHub using their GraphQL API
                    and presented in the form of an organization, team, or user
                    leaderboard.
                  </li>

                  <br />

                  <li>I hope you like it, enjoy!</li>
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
