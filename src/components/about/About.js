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
            <div className="card white">
              <div className="card-content grey-text text-darken-3">
                <span className="card-title">
                  <span className="text-style-bold">About</span>
                </span>

                <ul>
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
                      <span className="text-style-bold">
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

// Exports
export default About;
