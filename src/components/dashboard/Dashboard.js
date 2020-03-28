// Imports
import React from 'react';

import SelectUser from '../leaderboard/SelectUser';
import SelectOrganization from '../leaderboard/SelectOrganization';
import SelectTeam from '../leaderboard/SelectTeam';
import GenerateContributors from '../leaderboard/GenerateContributors';
import DisplayContributors from '../leaderboard/DisplayContributors';
import { generateStyle, displayStyle } from '../../styles';

// Component
const Dashboard = () => {
  return (
    <div className="dashboard container">
      <div>
        <div className="row">
          <div className="col s12 m3" style={generateStyle}>
            <SelectUser />
          </div>

          <div className="col s12 m3" style={generateStyle}>
            <SelectOrganization />
          </div>

          <div className="col s12 m3" style={generateStyle}>
            <SelectTeam />
          </div>

          <div className="col s12 m3" style={generateStyle}>
            <GenerateContributors />
          </div>
        </div>

        <div className="row">
          <div className="col s12 m12" style={displayStyle}>
            <DisplayContributors />
          </div>
        </div>

        <div className="center-text-align padding-bottom">
          {'Made with ❤ by '}
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
