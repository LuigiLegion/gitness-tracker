// Imports
import React from 'react';
import { NavLink } from 'react-router-dom';

// Component
const About = () => {
  return (
    <div className="container">
      <div className="row">
        <div className="col s12 m12 l12 xl12">
          <div className="section">
            <div className="card white">
              <div className="card-content grey-text text-darken-3">
                <span className="card-title">
                  <span className="text-style-bold">
                    About
                  </span>
                </span>

                <div className="divider" />

                <div className="card-content">
                  <div>
                    Gitness Tracker is a fitness tracker for coding.
                  </div>

                  <div>
                    I built it as a tool that helps open source project
                    maintainers hold friendly code contribution competitions by
                    allowing them to determine who contributed the most code
                    over a given period of time.
                  </div>

                  <div className="section">
                    Contributions are pulled from GitHub using their GraphQL API
                    and presented in the form of an organization, team, or user
                    leaderboard.
                  </div>

                  <div>I hope you like it, enjoy!</div>
                </div>

                <NavLink
                  className="text-style-bold"
                  to="/"
                >
                  ← Back To Main Page
                </NavLink>
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
