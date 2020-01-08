// Imports
import React from 'react';
import PropTypes from 'prop-types';

import GenerateOrganizations from '../leaderboard/GenerateOrganizations';
import GenerateTeams from '../leaderboard/GenerateTeams';
import GenerateContributors from '../leaderboard/GenerateContributors';
import DisplayContributors from '../leaderboard/DisplayContributors';
import { generateStyle, displayStyle } from '../../styles';

// Component
const Dashboard = props => {
  // console.log('props in Dashboard: ', props);

  return (
    <div className="dashboard container">
      <div>
        <div className="row">
          <div className="col s11 m4" style={generateStyle}>
            <GenerateOrganizations />
          </div>

          <div className="col s11 m4" style={generateStyle}>
            <GenerateTeams />
          </div>

          <div className="col s11 m4" style={generateStyle}>
            <GenerateContributors />
          </div>
        </div>

        <div className="row">
          <div className="col s11 m12" style={displayStyle}>
            <DisplayContributors />
          </div>
        </div>

        <div className="center-text-align padding-bottom">
          Made with ❤ by{' '}
          <a
            href="https://www.linkedin.com/in/talluigi"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="bold-text-style">Tal Luigi</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

// Prop Types
Dashboard.propTypes = {
  props: PropTypes.object,
};
